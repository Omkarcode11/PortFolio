// SEO Configuration & Schema Markup Generator
export const siteConfig = {
  title: 'Omkar Sonawane | AI & Full-Stack Developer',
  description: 'AI and full-stack developer specializing in AI applications, Shopify solutions, Node.js backend systems and business automation.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://omkarsonawane.dev',
  twitterHandle: '@omkardev',
  defaultImage: '/projects/ai-commerce-agent.svg',
  author: 'Omkar Sonawane',
  jobTitle: 'AI & Full-Stack Developer',
  location: 'Bengaluru, India',
  keywords: [
    'AI developer',
    'AI application development',
    'Shopify developer',
    'Shopify app development',
    'Node.js developer',
    'full-stack developer',
    'business automation',
    'AI automation',
    'custom web application development',
    'API integration',
    'Shopify integration',
  ]
};

// Schema Markup Generators
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Omkar Sonawane',
    jobTitle: siteConfig.jobTitle,
    url: siteConfig.url,
    image: `${siteConfig.url}/695d03a731783_download.jpg`,
    sameAs: [
      'https://github.com/Omkarcode11',
      'https://linkedin.com/in/omkardev',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'LLM Integrations',
      'AI Agents',
      'Shopify Development',
      'Theme App Extensions',
      'Node.js',
      'TypeScript',
      'React',
      'Next.js',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Business Automation',
      'Puppeteer',
      'REST APIs',
      'WebSockets',
      'System Architecture',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Bengaluru'
    }
  };
}

export function generateSoftwareApplicationSchema(project: {
  title: string;
  description: string;
  github?: string;
  link?: string;
  tags: string[];
  image?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1'
    },
    ...(project.github && {
      codeRepository: project.github,
      programmingLanguage: project.tags
    }),
    ...(project.link && { url: project.link }),
    ...(project.image && { image: project.image })
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  github?: string;
  link?: string;
  tags: string[];
  image?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'Person',
      name: 'Omkar Sonawane'
    },
    ...(project.github && {
      codeRepository: project.github
    }),
    ...(project.link && {
      url: project.link
    }),
    ...(project.image && {
      image: project.image
    }),
    keywords: project.tags.join(', '),
    programmingLanguage: project.tags
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  date: string;
  slug: string;
  coverImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: 'Omkar Sonawane'
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.ico`
      }
    },
    datePublished: article.date,
    ...(article.coverImage && {
      image: article.coverImage
    })
  };
}

// Meta tag helpers
export function generateMetaTags({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  keywords
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
}) {
  const metaTitle = title.includes('|') ? title : `${title} | ${siteConfig.title}`;
  const metaDescription = description || siteConfig.description;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteConfig.url}${image}`) : `${siteConfig.url}${siteConfig.defaultImage}`;
  const metaUrl = url ? (url.startsWith('http') ? url : `${siteConfig.url}${url}`) : siteConfig.url;
  const metaKeywords = keywords ? keywords.join(', ') : siteConfig.keywords.join(', ');

  return {
    title: metaTitle,
    description: metaDescription,
    image: metaImage,
    url: metaUrl,
    type,
    publishedTime,
    keywords: metaKeywords
  };
}
