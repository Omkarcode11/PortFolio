import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { getSortedArticles, getArticleData } from '../../lib/api';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ArticleData {
  title: string;
  date: string;
  tags: string[];
  content: string;
  slug: string;
  description?: string;
}

interface ArticleProps {
  article: ArticleData;
}

export default function Article({ article }: ArticleProps) {
  if (!article) return null;

  return (
    <>
      <Head>
        <title>{article.title} | Portfolio</title>
        <meta name="description" content={article.description || `Read ${article.title} on my portfolio.`} />
      </Head>
      
      <article className="container section max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Navigation */}
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 text-primary-500 font-bold mb-12 hover:gap-4 transition-all group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span className="text-sm uppercase tracking-wider">Back to Articles</span>
          </Link>

          <header className="mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <span className="badge bg-primary-500/10 text-primary-500 border-primary-500/20 px-4 py-1.5 ">
                {article.date}
              </span>
              <div className="h-0.5 w-12 bg-gradient-to-r from-primary-500 to-transparent rounded-full hidden sm:block" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)]">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-[var(--text-primary)]">
              {article.title}
            </h1>
            
            {article.description && (
              <p className="text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed font-medium italic border-l-4 border-primary-500 pl-6">
                {article.description}
              </p>
            )}
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-a:text-primary-500 hover:prose-a:text-primary-600 transition-colors prose-pre:bg-[var(--bg-tertiary)] prose-pre:border prose-pre:border-[var(--border-color)] prose-pre:rounded-2xl prose-img:rounded-2xl prose-img:shadow-2xl">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                 img: ({ ...props}) => <img className="w-full rounded-2xl my-12 shadow-2xl border border-[var(--border-color)]" {...props} alt={props.alt || ''} />,
                 h2: ({ ...props}) => <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-[var(--text-primary)]" {...props} />,
                 h3: ({ ...props}) => <h3 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-[var(--text-primary)]" {...props} />,
                 p: ({ ...props}) => <p className="text-lg lg:text-xl leading-relaxed mb-8 text-[var(--text-secondary)]" {...props} />,
                 ul: ({ ...props}) => <ul className="list-disc pl-6 mb-8 space-y-3 text-[var(--text-secondary)]" {...props} />,
                 ol: ({ ...props}) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-[var(--text-secondary)]" {...props} />,
                 code: ({ ...props}) => <code className="bg-primary-500/10 px-1.5 py-0.5 rounded font-mono text-sm text-primary-500" {...props} />,
                 pre: ({ ...props}) => <pre className="bg-[var(--bg-tertiary)] p-8 rounded-2xl overflow-x-auto border border-[var(--border-color)] mb-10 font-mono text-sm shadow-inner" {...props} />,
                 blockquote: ({ ...props}) => <blockquote className="border-l-4 border-primary-500 bg-primary-500/5 px-8 py-6 rounded-r-2xl mb-8 italic text-xl" {...props} />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-24 pt-12 border-t border-[var(--border-color)]">
            <div className="card bg-gradient-to-br from-primary-500/5 via-[var(--bg-card)] to-secondary-500/5 text-center p-12 border-2 border-primary-500/20 shadow-2xl overflow-hidden relative">
              {/* Decorative Circle */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl" />
              
              <h3 className="text-3xl font-bold mb-4 relative z-10">Thanks for reading!</h3>
              <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
                Stay tuned for more insights into technology and development. Feel free to explore my other projects or learn more about me.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link href="/about" className="btn px-10 py-4 text-base">Explore My Bio</Link>
                <Link href="/projects" className="btn btn-outline px-10 py-4 text-base">View Portfolio</Link>
              </div>
            </div>
          </footer>
        </motion.div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getSortedArticles();
  const paths = articles.map((article: any) => ({
    params: { slug: article.slug },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  if (!params?.slug) return { notFound: true };
  const article = await getArticleData(params.slug as string);
  if (!article) return { notFound: true };
  return {
    props: { article },
    revalidate: 60,
  };
};
