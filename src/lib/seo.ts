// SEO Metadata Helper for optimized search rankings
// Targeting South African, Kenyan, and Nigerian search terms

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
}

export const updatePageMetadata = (config: SEOConfig) => {
  // Update title
  document.title = config.title

  // Update or create meta description
  let descriptionMeta = document.querySelector('meta[name="description"]')
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta')
    descriptionMeta.setAttribute('name', 'description')
    document.head.appendChild(descriptionMeta)
  }
  descriptionMeta.setAttribute('content', config.description)

  // Update or create meta keywords
  if (config.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta')
      keywordsMeta.setAttribute('name', 'keywords')
      document.head.appendChild(keywordsMeta)
    }
    keywordsMeta.setAttribute('content', config.keywords.join(', '))
  }

  // Update canonical URL
  if (config.canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', config.canonical)
  }

  // Open Graph tags could be added here
}
