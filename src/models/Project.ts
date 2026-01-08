import mongoose, { Schema, model, models } from 'mongoose';

export interface IProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

const ProjectSchema = new Schema<IProject>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  link: String,
  github: String,
  image: String,
});

export default models.Project || model<IProject>('Project', ProjectSchema);
