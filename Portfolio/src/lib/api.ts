import dbConnect from './dbConnect';
import Project from '../models/Project';
import Article from '../models/Article';

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ title : -1 }).lean();
  return projects.map((p: any) => {
    const { createdAt, ...project } = p; // Remove createdAt
    return {
      ...project, 
      _id: p._id.toString()
    };
  });
}

export async function getSortedArticles() {
  await dbConnect();
  const articles = await Article.find({}).sort({ date: -1 }).lean();
  return articles.map((a: any) => {
    const { createdAt, ...article } = a; // Remove createdAt
    return {
      ...article, 
      _id: a._id.toString()
    };
  });
}

export async function getProjectBySlug(slug: string) {
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return null;
  const { createdAt, ...projectData } = project as any; // Remove createdAt
  return {
      ...projectData, 
      _id: (project as any)._id.toString()
  };
}

export async function getArticleData(slug: string) {
  await dbConnect();
  const article = await Article.findOne({ slug }).lean();
  if (!article) return null;
  const { createdAt, ...articleData } = article as any; // Remove createdAt
  return {
      ...articleData, 
      _id: (article as any)._id.toString()
  };
}
