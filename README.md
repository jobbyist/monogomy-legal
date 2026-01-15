# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages Deployment (Recommended)

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

**Deployment Steps:**

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Push to Main Branch:**
   - Any push to the `main` branch will trigger the deployment workflow automatically
   - The workflow can also be manually triggered from the Actions tab

3. **Access Your Site:**
   - Once deployed, your site will be available at the URL shown in the Pages settings
   - If using a custom domain (CNAME file), it will be available at that domain

**Manual Deployment:**
- Navigate to the Actions tab in your GitHub repository
- Click on "Deploy to GitHub Pages" workflow
- Click "Run workflow" to manually trigger a deployment

**Technical Details:**
- The build process uses Vite to bundle the application
- SPA routing is handled via a 404.html redirect mechanism
- The `.nojekyll` file prevents Jekyll processing on GitHub Pages
- All static assets are optimized and versioned for caching

### Alternative: Lovable Platform

You can also deploy via [Lovable](https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a) by clicking Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
