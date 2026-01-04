
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Simple Mongoose connection for script
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://omkar:sd34589gh398gh34988@cluster0.yyqlcgo.mongodb.net/portfolio?retryWrites=true&w=majority";

const ProjectSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    link: String,
    github: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const ArticleSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    content: { type: String, required: true },
    coverImage: String,
    createdAt: { type: Date, default: Date.now }
});
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

const ResumeSchema = new mongoose.Schema({
    summary: String,
    contact: {
      email: String,
      mobile: String,
      linkedin: String,
      github: String,
      leetcode: String,
      location: String
    },
    experience: [],
    skills: [String],
    education: {},
    certifications: [String]
});
const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Seed Projects
        const projectsPath = path.join(__dirname, '../src/content/projects.json');
        if (fs.existsSync(projectsPath)) {
            const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
            for (const p of projectsData) {
                await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true });
            }
            console.log('Projects seeded');
        }

        // Seed Resume
        const resumePath = path.join(__dirname, '../src/content/resume.json');
        if (fs.existsSync(resumePath)) {
            const resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
            await Resume.findOneAndUpdate({}, resumeData, { upsert: true });
            console.log('Resume seeded');
        }

        // Seed Articles (Markdown)
        const articlesDir = path.join(__dirname, '../src/content/articles');
        if (fs.existsSync(articlesDir)) {
            const files = fs.readdirSync(articlesDir);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    const slug = file.replace('.md', '');
                    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
                    // Simple parsing for frontmatter (naive)
                    // Better to use gray-matter, but using regex for standalone script to avoid ESM/CJS issues if possible, otherewise require
                    const matter = require('gray-matter');
                    const { data, content: markdownBody } = matter(content);
                    
                    await Article.findOneAndUpdate(
                        { slug }, 
                        { 
                            slug, 
                            title: data.title, 
                            date: data.date, 
                            description: data.description, 
                            tags: data.tags, 
                            content: markdownBody,
                            coverImage: data.coverImage 
                        }, 
                        { upsert: true }
                    );
                }
            }
            console.log('Articles seeded');
        }

        console.log('Seeding completed');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
