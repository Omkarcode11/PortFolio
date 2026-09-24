import dbConnect from './dbConnect';
import Project from '../models/Project';
import Article from '../models/Article';
import fs from 'fs';
import path from 'path';

function getLocalProjects(): any[] {
  try {
    const filePath = path.join(process.cwd(), 'src/content/projects.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading local projects.json:', err);
  }
  return [];
}

export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ title: -1 }).lean();
    if (projects && projects.length > 0) {
      return projects.map((p: any) => {
        const result: any = {
          _id: p._id?.toString() || p._id,
          slug: p.slug,
          title: p.title,
          description: p.description,
          tags: p.tags || [],
        };
        if (p.tagline) result.tagline = p.tagline;
        if (p.problem) result.problem = p.problem;
        if (p.solution) result.solution = p.solution;
        if (p.badge) result.badge = p.badge;
        if (p.category) result.category = p.category;
        if (p.isComingSoon !== undefined) result.isComingSoon = p.isComingSoon;
        if (p.link) result.link = p.link;
        if (p.github) result.github = p.github;
        if (p.image) result.image = p.image;
        return result;
      });
    }
  } catch (error) {
    console.warn('DB fetch failed, falling back to local projects.json:', error);
  }
  return getLocalProjects();
}

export async function getSortedArticles() {
  try {
    await dbConnect();
    const articles = await Article.find({}).sort({ slug: -1 }).lean();
    if (articles && articles.length > 0) {
      return articles.map((a: any) => {
        const result: any = {
          _id: a._id?.toString() || a._id,
          slug: a.slug,
          title: a.title,
          date: a.date,
          description: a.description,
          tags: a.tags || [],
          content: a.content,
        };
        if (a.coverImage) result.coverImage = a.coverImage;
        return result;
      });
    }
  } catch (error) {
    console.warn('DB fetch failed for articles:', error);
  }
  return [];
}

export async function getProjectBySlug(slug: string) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).lean();
    if (project) {
      const p = project as any;
      const result: any = {
        _id: p._id?.toString() || p._id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        tags: p.tags || [],
      };
      if (p.tagline) result.tagline = p.tagline;
      if (p.problem) result.problem = p.problem;
      if (p.solution) result.solution = p.solution;
      if (p.badge) result.badge = p.badge;
      if (p.category) result.category = p.category;
      if (p.isComingSoon !== undefined) result.isComingSoon = p.isComingSoon;
      if (p.link) result.link = p.link;
      if (p.github) result.github = p.github;
      if (p.image) result.image = p.image;
      return result;
    }
  } catch (error) {
    console.warn('DB fetch failed for project slug, checking local file:', error);
  }

  const localList = getLocalProjects();
  const match = localList.find((p) => p.slug === slug);
  return match || null;
}

export async function getArticleData(slug: string) {
  try {
    await dbConnect();
    const article = await Article.findOne({ slug }).lean();
    if (!article) return null;
    const a = article as any;
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
    return null;
  }
}
