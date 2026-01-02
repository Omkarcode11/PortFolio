import Head from 'next/head';
import Link from 'next/link';
import { getSortedArticles } from '../../lib/api';
import { GetStaticProps } from 'next';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
}

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  return (
    <>
      <Head>
        <title>Articles | Portfolio</title>
      </Head>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
        <div className="container relative z-10 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
               Latest <span className="text-gradient">Insights</span>
             </h1>
             <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
               Thoughts on software engineering, design patterns, and emerging technologies.
             </p>
           </motion.div>
        </div>
      </section>

      <section className="container section -mt-8 min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="card group block p-6 sm:p-8 hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   
                   <div className="relative z-10">
                     <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                        <h2 className="text-2xl font-bold group-hover:text-primary-500 transition-colors w-full">{article.title}</h2>
                        <span className="text-sm font-medium text-primary-500 whitespace-nowrap bg-primary-500/10 px-3 py-1 rounded-full">{article.date}</span>
                     </div>
                     <p className="text-base text-[var(--text-secondary)] mb-6 line-clamp-2 leading-relaxed max-w-2xl">{article.description}</p>
                     
                     <div className="flex items-center text-sm font-bold text-[var(--text-primary)] group-hover:text-primary-500 transition-colors">
                       Read Article 
                       <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                       </svg>
                     </div>
                   </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {articles.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="text-center py-20"
             >
               <div className="text-4xl mb-4">✍️</div>
               <h3 className="text-xl font-bold">No articles published yet</h3>
             </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const articles = await getSortedArticles();
  return {
    props: { articles },
    revalidate: 60,
  };
};
