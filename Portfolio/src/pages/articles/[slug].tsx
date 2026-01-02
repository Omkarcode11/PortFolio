import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { getSortedArticles, getArticleData } from '../../lib/api';
import remarkGfm from 'remark-gfm';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ArticleData {
  title: string;
  date: string;
  tags: string[];
  content: string;
  slug: string;
}

interface ArticleProps {
  article: ArticleData;
}

export default function Article({ article }: ArticleProps) {
  return (
    <>
      <Head>
        <title>{article.title} | Portfolio</title>
      </Head>
      <article className="container section max-w-3xl mx-auto px-4">
        <header className="text-center mb-16">
           <span className="block mb-4 text-primary-500 font-semibold tracking-wider uppercase text-sm">{article.date}</span>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">{article.title}</h1>
           <div className="flex flex-wrap justify-center gap-3">
              {article.tags.map(tag => (
                 <span key={tag} className="text-sm font-medium px-4 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)]">
                   #{tag}
                 </span>
              ))}
           </div>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-a:text-primary-500 hover:prose-a:text-primary-600 transition-colors">
           <ReactMarkdown 
             remarkPlugins={[remarkGfm]}
             components={{
                img: ({ ...props}) => <img className="w-full rounded-xl my-12 shadow-2xl" {...props} alt={props.alt || ''} />,
                h2: ({ ...props}) => <h2 className="text-3xl font-bold mt-12 mb-6" {...props} />,
                h3: ({ ...props}) => <h3 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                p: ({ ...props}) => <p className="text-lg leading-relaxed mb-6 text-[var(--text-secondary)]" {...props} />,
                ul: ({ ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--text-secondary)]" {...props} />,
                ol: ({ ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[var(--text-secondary)]" {...props} />,
                code: ({ ...props}) => <code className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded font-mono text-sm text-primary-500" {...props} />,
                pre: ({ ...props}) => <pre className="bg-[var(--bg-secondary)] p-6 rounded-xl overflow-x-auto border border-[var(--border-color)] mb-8 font-mono text-sm" {...props} />,
             }}
           >
             {article.content}
           </ReactMarkdown>
        </div>
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
