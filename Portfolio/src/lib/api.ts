import dbConnect from './dbConnect';
import Project from '../models/Project';
import Article from '../models/Article';

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return projects.map((p: any) => ({
     ...p, 
     _id: p._id.toString(), 
     ...(p.createdAt && { createdAt: (p.createdAt as Date).toISOString() })
  }));
}

export async function getSortedArticles() {
  await dbConnect();
  const articles = await Article.find({}).sort({ date: -1 }).lean();
  return articles.map((a: any) => ({
      ...a, 
      _id: a._id.toString(), 
      ...(a.createdAt && typeof a.createdAt === 'object' && a.createdAt.toISOString ? { createdAt: a.createdAt.toISOString() } : {})
  }));
}

export async function getProjectBySlug(slug: string) {
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return null;
  return {
      ...project, 
      _id: (project as any)._id.toString(), 
      ...((project as any).createdAt && { createdAt: ((project as any).createdAt as Date).toISOString() })
  };
}

export async function getArticleData(slug: string) {
  await dbConnect();
  const article = await Article.findOne({ slug }).lean();
  if (!article) return null;
  const a = article as any;
  return {
      ...article, 
      _id: a._id.toString(), 
      ...(a.createdAt && typeof a.createdAt === 'object' && a.createdAt.toISOString ? { createdAt: a.createdAt.toISOString() } : {})
  };
}
