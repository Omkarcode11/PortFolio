import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import dbConnect from '../lib/dbConnect';
import Resume from '../models/Resume';
import { GetStaticProps } from 'next';
import SEO from '../components/SEO';
import { generatePersonSchema } from '../lib/seo';
import LeetCodeStats from '../components/LeetCodeStats';
import GitHubStats from '../components/GitHubStats';

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights?: string[];
}

interface Education {
  degree: string;
  university: string;
  year: string;
}

interface Contact {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

interface ResumeData {
  summary: string;
  experience: Experience[];
  education: Education;
  certifications?: string[];
  skills: string[];
  resumeLink?: string;
  contact: Contact;
}

interface AboutProps {
  resume: ResumeData | null;
}

export default function About({ resume }: AboutProps) {
  if (!resume || !resume.summary) {
    return (
      <div className="container section min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full border-4 border-brand-cyan/20 border-t-brand-cyan animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Loading Profile...</h1>
          <p className="text-[var(--text-secondary)] mt-2">Please wait while we fetch your information</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="About | Backend Engineer | Node.js Developer India"
        description="Learn about my experience building scalable backend systems, system design expertise, and production experience with Node.js, TypeScript, MongoDB, PostgreSQL, and AWS. Available for backend engineering roles."
        keywords={[
          "Backend Engineer",
          "Node.js Developer",
          "Full Stack Developer",
          "System Design Engineer",
          "Backend Developer India",
          "About Backend Engineer"
        ]}
        url="/about"
        schema={generatePersonSchema()}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative w-40 h-40 mx-auto">
                {/* Gradient border effect */}
                <div className="absolute inset-[-4px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full animate-gradient-shift" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)] shadow-2xl">
                  <Image
                    src="/695d03a731783_download.jpg"
                    alt="Omkar Sonawane - Full Stack Engineer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase">
                Professional Profile
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet">Me</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
            >
              Crafting exceptional digital experiences through innovative solutions and cutting-edge technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="container section min-h-[80vh] pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          <div className="space-y-20">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                Professional Summary
              </h2>
              <div className="relative p-8 rounded-3xl bg-[var(--bg-secondary)]/50 backdrop-blur-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet opacity-50 rounded-t-3xl" />
                <p className="text-lg text-[var(--text-primary)] leading-relaxed relative z-10">
                  {resume.summary}
                </p>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-violet/20 flex items-center justify-center text-brand-violet">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                Work Experience
              </h2>
              
              <div className="space-y-12 relative">
                {/* Subtle vertical guide */}
                <div className="absolute left-[19px] top-4 bottom-8 w-px bg-gradient-to-b from-brand-blue/50 via-brand-violet/20 to-transparent hidden sm:block" />

                {resume.experience?.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-0 sm:pl-16 group"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-[var(--bg-primary)] border-4 border-[var(--bg-secondary)] shadow-sm hidden sm:flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue" />
                    </div>

                    <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-secondary)]/30 hover:bg-[var(--bg-secondary)]/80 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                            {job.role}
                          </h3>
                          <div className="flex items-center gap-2 text-brand-blue font-medium mt-1">
                             <span>{job.company}</span>
                          </div>
                        </div>
                        <span className="self-start px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue text-sm font-semibold whitespace-nowrap">
                          {job.duration}
                        </span>
                      </div>
                      
                      <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                        {job.description}
                      </p>
                      
                      {job.highlights && job.highlights.length > 0 && (
                        <div className="space-y-3">
                          {job.highlights.map((h, i) => (
                            <div key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet/50 mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* GitHub Stats - Below Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <GitHubStats username="Omkarcode11" />
            </motion.div>

            {/* Education Desktop - Moved to main column on mobile, keep desktop layout logic if desired or stack */}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* LeetCode Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <LeetCodeStats username="omkardev" />
            </motion.div>

             {/* Tech Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-[var(--bg-secondary)]/30 border border-transparent hover:border-brand-blue/10 transition-colors"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-brand-cyan">⚡</span> Skills & Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] text-sm font-medium text-[var(--text-secondary)] hover:text-brand-blue hover:bg-brand-blue/10 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pl-2">
                <span className="text-brand-violet">🎓</span> Education
              </h3>
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-brand-violet/5 to-transparent border border-brand-violet/10">
                 <h4 className="font-bold text-lg mb-1">{resume.education?.degree}</h4>
                 <p className="text-brand-violet font-medium text-sm mb-4">{resume.education?.university}</p>
                 <span className="inline-block px-3 py-1 rounded-md bg-brand-violet/10 text-brand-violet text-xs font-bold">
                    {resume.education?.year}
                 </span>
              </div>
            </motion.div>

            {/* Certifications (if any) */}
            {resume.certifications && resume.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pl-2">
                  <span className="text-brand-blue">📜</span> Certifications
                </h3>
                <ul className="space-y-4">
                  {resume.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-3 text sm text-[var(--text-secondary)]">
                       <span className="w-2 h-2 rounded-full bg-brand-blue/50" />
                       {cert}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Contact / Download */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-8 border-t border-[var(--border-color)]"
            >
               <div className="flex flex-col gap-4">
                  <a
                    href={resume.resumeLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90"
                  >
                    Download Resume
                  </a>
                  
                  <div className="flex gap-4 justify-center mt-4">
                     {resume.contact?.github && (
                       <a href={resume.contact.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-brand-blue hover:bg-brand-blue/10 transition-all">
                         <FaGithub size={20} />
                       </a>
                     )}
                     {resume.contact?.linkedin && (
                       <a href={resume.contact.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-brand-blue hover:bg-brand-blue/10 transition-all">
                         <FaLinkedin size={20} />
                       </a>
                     )}
                     {resume.contact?.email && (
                       <a href={`mailto:${resume.contact.email}`} className="p-3 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-brand-blue hover:bg-brand-blue/10 transition-all">
                         <FaEnvelope size={20} />
                       </a>
                     )}
                  </div>
               </div>
            </motion.div>

          </aside>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  try {
    await dbConnect();
    const resumeDoc = await Resume.findOne({}).lean();

    if (!resumeDoc) {
      return { props: { resume: null } };
    }

    const resume = JSON.parse(JSON.stringify(resumeDoc));

    return {
      props: { resume },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching resume:', error);
    return { props: { resume: null } };
  }
};
