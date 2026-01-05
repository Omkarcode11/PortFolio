import dbConnect from './dbConnect';
import Project from '../models/Project';
import Article from '../models/Article';

export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ title : -1 }).lean();
    return projects.map((p: any) => {
      // Create new object without createdAt to ensure it's completely removed
      const result: any = {
        _id: p._id?.toString() || p._id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        tags: p.tags,
      };
      if (p.link) result.link = p.link;
      if (p.github) result.github = p.github;
      if (p.image) result.image = p.image;
      return result;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return empty array if DB connection fails
  }
}

export async function getSortedArticles() {
  try {
    await dbConnect();
    const articles = await Article.find({}).sort({ slug: -1 }).lean();
    return articles.map((a: any) => {
      // Create new object without createdAt to ensure it's completely removed
      const result: any = {
        _id: a._id?.toString() || a._id,
        slug: a.slug,
        title: a.title,
        date: a.date,
        description: a.description,
        tags: a.tags,
        content: a.content,
      };
      if (a.coverImage) result.coverImage = a.coverImage;
      return result;
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return empty array if DB connection fails
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).lean();
    if (!project) return null;
    const p = project as any;
    // Create new object without createdAt to ensure it's completely removed
    const result: any = {
      _id: p._id?.toString() || p._id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      tags: p.tags,
    };
    if (p.link) result.link = p.link;
    if (p.github) result.github = p.github;
    if (p.image) result.image = p.image;
    return result;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null; // Return null if DB connection fails
  }
}

export async function getArticleData(slug: string) {
  try {
    await dbConnect();
    const article = await Article.findOne({ slug }).lean();
    if (!article) return null;
    const a = article as any;
    // Create new object without createdAt to ensure it's completely removed
    const result: any = {
      _id: a._id?.toString() || a._id,
      slug: a.slug,
      title: a.title,
      date: a.date,
      description: a.description,
      tags: a.tags,
      content: a.content,
    };
    if (a.coverImage) result.coverImage = a.coverImage;
    return result;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null; // Return null if DB connection fails
  }
}
