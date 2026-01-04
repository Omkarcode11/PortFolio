import mongoose, { Schema, model, models } from 'mongoose';

export interface IExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights: string[];
}

export interface IEducation {
  degree: string;
  university: string;
  year: string;
}

export interface IResume {
  summary: string;
  contact: {
    email: string;
    mobile: string;
    linkedin: string;
    github: string;
    leetcode: string;
    location: string;
  };
  experience: IExperience[];
  skills: string[];
  education: IEducation;
  certifications: string[];
  resumeLink?: string;
}

const ExperienceSchema = new Schema<IExperience>({
  role: String,
  company: String,
  duration: String,
  description: String,
  highlights: [String]
});

const EducationSchema = new Schema<IEducation>({
  degree: String,
  university: String,
  year: String
});

const ResumeSchema = new Schema<IResume>({
  summary: String,
  contact: {
    email: String,
    mobile: String,
    linkedin: String,
    github: String,
    leetcode: String,
    location: String
  },
  experience: [ExperienceSchema],
  skills: [String],
  education: EducationSchema,
  certifications: [String],
  resumeLink: String
});

export default models.Resume || model<IResume>('Resume', ResumeSchema);
