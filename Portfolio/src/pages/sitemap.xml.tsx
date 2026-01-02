import { GetServerSideProps } from 'next';
import { getProjects, getSortedArticles } from '../lib/api';

const EXTERNAL_DATA_URL = 'https://your-portfolio-domain.com';

function generateSiteMap(projects: any[], articles: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Core Pages -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/projects</loc>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/articles</loc>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>

     <!-- Dynamic Projects -->
     ${projects
       .map(({ slug }) => {
         return `
       <url>
           <loc>${EXTERNAL_DATA_URL}/projects/${slug}</loc>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}

     <!-- Dynamic Articles -->
     ${articles
       .map(({ slug, date }) => {
         return `
       <url>
           <loc>${EXTERNAL_DATA_URL}/articles/${slug}</loc>
           <lastmod>${date}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Fetch data
  const projects = await getProjects();
  const articles = await getSortedArticles();

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(projects, articles);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
