import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

const siteConfig = {
  title: 'Omkar - Full Stack Developer',
  description: 'Portfolio of a creative full stack developer specializing in modern web technologies, React, Node.js, and cloud architecture.',
  url: 'https://your-portfolio-domain.com',
  twitterHandle: '@omkar',
  defaultImage: '/hero-bg.png', // Assuming this exists or generic
  author: 'Omkar'
};

export default function SEO({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  publishedTime,
  author
}: SEOProps) {
  const metaTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const metaDescription = description || siteConfig.description;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteConfig.url}${image}`) : `${siteConfig.url}${siteConfig.defaultImage}`;
  const metaUrl = url ? (url.startsWith('http') ? url : `${siteConfig.url}${url}`) : siteConfig.url;
  const metaAuthor = author || siteConfig.author;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={metaAuthor} />
      <link rel="canonical" href={metaUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Article Specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
