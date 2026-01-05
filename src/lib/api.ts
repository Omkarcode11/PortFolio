import dbConnect from './dbConnect';
import Project from '../models/Project';
import Article from '../models/Article';

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return projects.map((p: any) => ({
     ...p, _id: p._id.toString(), createdAt: new Date(p.createdAt as Date).toISOString()
  }));
}

export async function getSortedArticles() {
  await dbConnect();
  const articles = await Article.find({}).sort({ date: -1 }).lean();
  return articles.map((a: any) => ({
      ...a, _id: a._id.toString(), createdAt: new Date(a.createdAt as Date).toISOString()
  }));
}

export async function getArticleData(slug: string) {
  await dbConnect();
  const article = await Article.findOne({ slug }).lean();
  if (!article) return null;
  return {
      ...article, _id: (article as any)._id.toString(), createdAt: new Date((article as any).createdAt as Date).toISOString()
  };
}
