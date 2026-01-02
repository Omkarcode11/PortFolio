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
      <section className="container section">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">Writing</h1>
          
          <div className="flex flex-col gap-8">
            {articles.map((article) => (
              <Link 
                href={`/articles/${article.slug}`} 
                key={article.slug} 
                className="group block py-8 border-b border-[var(--border-color)] transition-all duration-300 hover:px-4 hover:bg-[var(--bg-secondary)] rounded-lg"
              >
                 <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                    <h2 className="text-2xl font-bold group-hover:text-primary-500 transition-colors">{article.title}</h2>
                    <span className="text-sm text-[var(--text-secondary)] font-medium md:ml-4">{article.date}</span>
                 </div>
                 <p className="text-lg text-[var(--text-secondary)] mb-4 line-clamp-2">{article.description}</p>
                 <span className="text-primary-500 font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                   Read Article <span>→</span>
                 </span>
              </Link>
            ))}
          </div>
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
