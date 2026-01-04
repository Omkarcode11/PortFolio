// SEO Configuration & Schema Markup Generator
export const siteConfig = {
  title: 'Omkar - Backend Engineer | Node.js Developer Portfolio',
  description: 'Backend-focused full-stack engineer building scalable distributed systems, high-performance APIs, and production-ready architectures. Expert in Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and system design.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-portfolio-domain.com',
  twitterHandle: '@omkardev',
  defaultImage: '/og-image.png',
  author: 'Omkar',
  jobTitle: 'Backend Engineer',
  location: 'India',
  keywords: [
    'Backend Developer',
    'Node.js Developer',
    'Full Stack Developer India',
    'Backend Engineer India',
    'System Design Engineer',
    'Distributed Systems Engineer',
    'MERN Stack Developer',
    'TypeScript Developer',
    'API Developer',
    'Scalable Backend Architecture',
    'Node.js Expert',
    'MongoDB Developer',
    'PostgreSQL Developer',
    'AWS Engineer',
    'Software Engineer Portfolio'
  ]
};

// Schema Markup Generators
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Omkar',
    jobTitle: siteConfig.jobTitle,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.defaultImage}`,
    sameAs: [
      'https://github.com/Omkarcode11',
      'https://linkedin.com/in/omkardev',
    ],
    knowsAbout: [
      'Node.js',
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'MongoDB',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Docker',
      'Kubernetes',
      'System Design',
      'Distributed Systems',
      'REST APIs',
      'WebSockets',
      'Microservices',
      'Database Design',
      'Backend Architecture',
      'Performance Optimization',
      'Scalability'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
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
  createdAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'Person',
      name: 'Omkar'
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
    ...(project.createdAt && {
      dateCreated: project.createdAt
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
      name: 'Omkar'
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`
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

