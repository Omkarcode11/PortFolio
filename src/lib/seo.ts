// SEO Configuration & Schema Markup Generator
export const siteConfig = {
  title: 'Omkar Sonawane | Freelance Software Engineer & Full-Stack AI, React, Shopify Developer',
  description: 'Hire Omkar Sonawane — Freelance Software Engineer & Full-Stack Developer specializing in React, Next.js, Shopify theme/app engineering, Node.js backends, AI applications, and workflow automation.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://omkarsonawane.dev',
  twitterHandle: '@omkardev',
  defaultImage: '/projects/ai-commerce-agent.svg',
  author: 'Omkar Sonawane',
  jobTitle: 'Freelance Software Engineer & Full-Stack Developer',
  location: 'Bengaluru, India',
  keywords: [
    'freelance software engineer',
    'freelance sde',
    'software freelancer',
    'react freelancer',
    'react developer freelance',
    'shopify freelancer',
    'shopify developer freelance',
    'freelance shopify developer',
    'freelance full-stack developer',
    'full stack freelancer',
    'freelance node.js developer',
    'backend freelancer',
    'freelance ai developer',
    'ai engineer freelance',
    'ai application developer',
    'business automation freelancer',
    'hire freelance software engineer',
    'hire react developer',
    'hire shopify developer',
    'custom web application development',
    'api integration freelancer',
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
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Freelance Software Engineer',
      skills: 'React, Next.js, TypeScript, Node.js, Shopify, Liquid, AI, Automation, Redis, PostgreSQL',
    },
    knowsAbout: [
      'Freelance Software Engineering',
      'React.js Development',
      'Next.js Full-Stack Architecture',
      'Shopify Theme & App Development',
      'Node.js Backend Systems',
      'Artificial Intelligence & LLM Agents',
      'Business Process Automation',
      'Redis Caching & Latency Optimization',
      'PostgreSQL & MongoDB',
      'Puppeteer Automation',
      'REST & WebSocket APIs',
      'System Architecture & Design',
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

export function generateProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Omkar Sonawane - Freelance Software Engineer & Full-Stack Developer',
    description: 'Hire freelance software engineer Omkar Sonawane for React, Next.js, sub-second Shopify storefront optimization (<1s), scalable Node.js backend systems, AI agents, and business automation workflows.',
    url: siteConfig.url,
    image: `${siteConfig.url}/695d03a731783_download.jpg`,
    priceRange: '$$',
    serviceType: [
      'Freelance Software Engineering',
      'Freelance React Development',
      'Freelance Shopify Development',
      'Freelance Full-Stack Development',
      'Freelance Node.js Backend Engineering',
      'Freelance AI & LLM Integration',
      'Business Process Automation',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Bengaluru',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Freelance Software Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freelance Software Development & SDE Consulting',
            description: 'End-to-end full-stack software development, architectural design, database modeling, and code ownership for startups and growth businesses.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freelance React & Next.js Frontend Engineering',
            description: 'Modern, high-performance web applications built with React 19, Next.js, TypeScript, sub-second load times, and responsive UX.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freelance Shopify Storefront & App Development',
            description: 'Sub-second (<1s) storefront speed optimization, custom Liquid sections, Theme App Extensions, and Cart Webhook integrations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freelance Node.js Backend & API Systems',
            description: 'High-throughput REST/WebSocket APIs, Redis distributed caching, database indexing, and 60% latency reductions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freelance AI Application & Agent Integration',
            description: 'Custom RAG pipelines, LLM agents, OpenAI & Claude integrations, vector search, and intelligent workflow automation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freelance Business Process Automation',
            description: 'Puppeteer web scrapers, BullMQ background queues, WhatsApp Cloud API integrations, reducing manual overhead by up to 85%.',
          },
        },
      ],
    },
  };
}

