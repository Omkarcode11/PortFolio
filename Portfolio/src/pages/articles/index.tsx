import Head from 'next/head';
import SEO from '../../components/SEO';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSortedArticles } from '../../lib/api';
import { GetStaticProps } from 'next';

interface Article {
  slug: string;
  title: string;
  description: string;
}

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  return (
    <>
      <SEO
        title="Articles & Learnings | Backend Developer Blog"
        description="Technical articles, system design insights, and engineering learnings on backend development, distributed systems, Node.js, TypeScript, and scalable architecture."
        keywords={[
          "Backend Developer Blog",
          "System Design Articles",
          "Node.js Tutorials",
          "Backend Engineering Blog",
          "Technical Articles"
        ]}
        url="/articles"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="max-w-4xl mx-auto"
           >
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-violet/10 rounded-full mb-8">
               <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
               <span className="text-brand-violet font-semibold text-sm tracking-wide uppercase">
                 Blog & Insights
               </span>
             </div>
             
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
               Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet">Insights</span>
             </h1>
             
             <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
               Thoughts on software engineering, design patterns, and emerging technologies.
             </p>
           </motion.div>
        </div>
      </section>

      <section className="container section -mt-8 min-h-[60vh] pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="card group block p-8 rounded-3xl bg-[var(--bg-secondary)]/30 hover:bg-[var(--bg-secondary)]/80 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 border border-transparent hover:border-brand-blue/10"
                >
                   {/* Gradient Shine Effect */}
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                   
                   <div className="relative z-10">
                     <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors w-full tracking-tight">
                          {article.title}
                        </h2>
                     </div>
                     <p className="text-base text-[var(--text-secondary)] mb-6 line-clamp-2 leading-relaxed max-w-2xl">
                       {article.description}
                     </p>
                     
                     <div className="flex items-center text-sm font-bold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
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
               <h3 className="text-xl font-bold mb-2">No articles published yet</h3>
               <p className="text-[var(--text-secondary)]">Check back soon for new content!</p>
             </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    const articles = await getSortedArticles();
    return {
      props: { articles: articles || [] },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: { articles: [] },
      revalidate: 60,
    };
  }
};
