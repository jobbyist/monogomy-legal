-- Enable pgvector extension
create extension if not exists vector with schema extensions;

-- Create custom types
create type user_role as enum ('client', 'attorney', 'admin');
create type country_code as enum ('ZA', 'KE', 'NG');
create type document_status as enum ('drafted', 'pending_review', 'attorney_approved', 'sent_to_client');
create type consultation_status as enum ('scheduled', 'completed', 'canceled');

-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role user_role not null default 'client',
  country country_code,
  full_name text,
  phone text,
  onboarding_completed boolean default false,
  onboarding_metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Attorney profiles table
create table attorney_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade not null unique,
  bar_number text not null,
  verified boolean default false,
  practice_areas text[] default array[]::text[],
  jurisdiction country_code not null,
  paystack_payout_details jsonb default '{}'::jsonb,
  bio text,
  years_experience integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Templates table (digital library)
create table templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  raw_markdown_content text not null,
  jurisdiction country_code,
  preview_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Documents table (client contracts)
create table documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id) on delete cascade not null,
  attorney_id uuid references profiles(id) on delete set null,
  template_id uuid references templates(id) on delete set null,
  title text not null,
  status document_status not null default 'drafted',
  file_path text,
  raw_text text,
  ai_analysis jsonb default '{}'::jsonb,
  attorney_notes text,
  final_file_path text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  approved_at timestamp with time zone,
  sent_at timestamp with time zone
);

-- Document chunks table (for RAG)
create table document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade not null,
  content text not null,
  embedding vector(1536),
  chunk_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Consultations table
create table consultations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id) on delete cascade not null,
  attorney_id uuid references profiles(id) on delete set null,
  scheduled_at timestamp with time zone not null,
  duration_minutes integer default 15,
  status consultation_status not null default 'scheduled',
  notes text,
  meeting_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index idx_profiles_role on profiles(role);
create index idx_profiles_country on profiles(country);
create index idx_attorney_profiles_verified on attorney_profiles(verified);
create index idx_attorney_profiles_jurisdiction on attorney_profiles(jurisdiction);
create index idx_documents_client_id on documents(client_id);
create index idx_documents_attorney_id on documents(attorney_id);
create index idx_documents_status on documents(status);
create index idx_document_chunks_document_id on document_chunks(document_id);
create index idx_consultations_client_id on consultations(client_id);
create index idx_consultations_attorney_id on consultations(attorney_id);
create index idx_consultations_scheduled_at on consultations(scheduled_at);

-- Create HNSW index for vector similarity search
create index on document_chunks using hnsw (embedding vector_cosine_ops);

-- RPC function for similarity search
create or replace function match_document_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 10,
  filter_document_id uuid default null
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    document_chunks.id,
    document_chunks.document_id,
    document_chunks.content,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where 
    (filter_document_id is null or document_chunks.document_id = filter_document_id)
    and 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Enable Row Level Security
alter table profiles enable row level security;
alter table attorney_profiles enable row level security;
alter table templates enable row level security;
alter table documents enable row level security;
alter table document_chunks enable row level security;
alter table consultations enable row level security;

-- RLS Policies for profiles
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- RLS Policies for attorney_profiles
create policy "Anyone can view verified attorney profiles"
  on attorney_profiles for select
  using (verified = true);

create policy "Attorneys can view their own profile"
  on attorney_profiles for select
  using (profile_id = auth.uid());

create policy "Attorneys can update their own profile"
  on attorney_profiles for update
  using (profile_id = auth.uid());

create policy "Attorneys can insert their own profile"
  on attorney_profiles for insert
  with check (profile_id = auth.uid());

-- RLS Policies for templates (public read)
create policy "Anyone can view active templates"
  on templates for select
  using (is_active = true);

create policy "Admins can manage templates"
  on templates for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- RLS Policies for documents
create policy "Clients can view their own documents"
  on documents for select
  using (client_id = auth.uid());

create policy "Attorneys can view documents assigned to them"
  on documents for select
  using (
    attorney_id = auth.uid()
    or exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Clients can insert their own documents"
  on documents for insert
  with check (client_id = auth.uid());

create policy "Clients can update their own drafted documents"
  on documents for update
  using (client_id = auth.uid() and status = 'drafted');

create policy "Attorneys can update documents assigned to them"
  on documents for update
  using (
    attorney_id = auth.uid()
    and status in ('pending_review', 'attorney_approved')
  );

-- RLS Policies for document_chunks
create policy "Users can view chunks of their documents"
  on document_chunks for select
  using (
    exists (
      select 1 from documents
      where documents.id = document_chunks.document_id
      and (documents.client_id = auth.uid() or documents.attorney_id = auth.uid())
    )
  );

create policy "System can insert chunks"
  on document_chunks for insert
  with check (
    exists (
      select 1 from documents
      where documents.id = document_chunks.document_id
      and documents.client_id = auth.uid()
    )
  );

-- RLS Policies for consultations
create policy "Clients can view their own consultations"
  on consultations for select
  using (client_id = auth.uid());

create policy "Attorneys can view their assigned consultations"
  on consultations for select
  using (attorney_id = auth.uid());

create policy "Clients can insert their own consultations"
  on consultations for insert
  with check (client_id = auth.uid());

create policy "Clients can update their own consultations"
  on consultations for update
  using (client_id = auth.uid());

create policy "Attorneys can update their assigned consultations"
  on consultations for update
  using (attorney_id = auth.uid());

-- Function to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger update_profiles_updated_at before update on profiles for each row execute procedure update_updated_at_column();
create trigger update_attorney_profiles_updated_at before update on attorney_profiles for each row execute procedure update_updated_at_column();
create trigger update_templates_updated_at before update on templates for each row execute procedure update_updated_at_column();
create trigger update_documents_updated_at before update on documents for each row execute procedure update_updated_at_column();
create trigger update_consultations_updated_at before update on consultations for each row execute procedure update_updated_at_column();
