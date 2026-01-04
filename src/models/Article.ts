import mongoose, { Schema, model, models } from 'mongoose';

export interface IArticle {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  coverImage?: string;
  createdAt: Date;
}

const ArticleSchema = new Schema<IArticle>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  coverImage: String,
  createdAt: { type: Date, default: Date.now }
});

export default models.Article || model<IArticle>('Article', ArticleSchema);
