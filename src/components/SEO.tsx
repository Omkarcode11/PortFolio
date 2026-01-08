import Head from 'next/head';
import { siteConfig, generateMetaTags } from '../lib/seo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
  canonical?: string;
  schema?: object | object[];
}

export default function SEO({ 
  title = siteConfig.title,
  description = siteConfig.description,
  image,
  url,
  type = 'website',
  publishedTime,
  author = siteConfig.author,
  keywords,
  noindex = false,
  canonical,
  schema
}: SEOProps) {
  const meta = generateMetaTags({
    title,
    description,
    image,
    url,
    type,
    publishedTime,
    keywords
  });

  const canonicalUrl = canonical || meta.url;

  // Handle multiple schemas
  const schemas = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <meta name="author" content={author} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={meta.url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      
      {/* Article Specific */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* Schema Markup */}
      {schemas.map((schemaData, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData, null, 0)
          }}
        />
      ))}
    </Head>
  );
}
