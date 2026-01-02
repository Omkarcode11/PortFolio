import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import dbConnect from '../lib/dbConnect';
import Resume from '../models/Resume';
import { GetStaticProps } from 'next';

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
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Loading Profile...</h1>
          <p className="text-[var(--text-secondary)] mt-2">Please wait while we fetch your information</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>About | Omkar Sonawane</title>
        <meta
          name="description"
          content="Learn more about Omkar Sonawane - Full-stack developer passionate about building scalable web applications."
        />
      </Head>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500/10 border border-primary-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-500 font-bold text-sm tracking-wider uppercase">
                Professional Profile
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              About <span className="text-gradient">Me</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
            >
              Crafting exceptional digital experiences through innovative solutions and cutting-edge technology
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '120px' }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-1.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-full mx-auto mt-8"
            />
          </motion.div>
        </div>
      </section>

      <section className="container section min-h-[80vh] -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
            <div className="space-y-16">
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative card bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] p-8 lg:p-10 border-2 border-primary-500/20">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-2">
                        <span>Professional Summary</span>
                      </h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
                    </div>
                  </div>
                  <p className="text-base lg:text-lg text-[var(--text-primary)] leading-relaxed pl-16">
                    {resume.summary}
                  </p>
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">Work Experience</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
                  </div>
                </div>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500 opacity-30 hidden lg:block" />
                  
                  <div className="flex flex-col gap-8 lg:gap-12">
                    {resume.experience?.map((job, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.15 }}
                        className="relative group"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-0 lg:left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-[var(--bg-primary)] shadow-lg z-10 hidden lg:block" />
                        
                        <div className="lg:pl-16">
                          <div className="card border-l-4 border-primary-500 hover:border-secondary-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-[var(--bg-card)] group-hover:to-[var(--bg-secondary)]">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
                                  {job.role}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  <p className="text-primary-500 font-bold text-sm lg:text-base">
                                    {job.company}
                                  </p>
                                </div>
                              </div>
                              <span className="badge whitespace-nowrap bg-primary-500/10 text-primary-500 border-primary-500/30">
                                {job.duration}
                              </span>
                            </div>
                            
                            <p className="text-[var(--text-secondary)] mb-5 leading-relaxed text-sm lg:text-base">
                              {job.description}
                            </p>
                            
                            {job.highlights && job.highlights.length > 0 && (
                              <div className="pt-4 border-t border-[var(--border-color)]">
                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                                  <svg className="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Key Achievements
                                </h4>
                                <ul className="space-y-3">
                                  {job.highlights.map((h, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.6 + index * 0.15 + i * 0.05 }}
                                      className="flex items-start gap-3 text-sm lg:text-base text-[var(--text-secondary)] group/item"
                                    >
                                      <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary-500/20 transition-colors">
                                        <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <span className="flex-1 leading-relaxed">{h}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v9M5 13l7-7 7 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">Education</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full" />
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="card border-l-4 border-secondary-500 hover:border-primary-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-500/20 to-primary-500/20 flex items-center justify-center flex-shrink-0 border-2 border-secondary-500/30">
                      <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold mb-2 text-[var(--text-primary)]">
                        {resume.education?.degree}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-[var(--text-secondary)] text-sm lg:text-base">
                          {resume.education?.university}
                        </p>
                      </div>
                      <span className="badge bg-secondary-500/10 text-secondary-500 border-secondary-500/30">
                        {resume.education?.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-secondary-500 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl lg:text-4xl font-bold mb-2">Certifications</h2>
                      <div className="h-1 w-24 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="card bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)]">
                    <ul className="space-y-4">
                      {resume.certifications.map((cert, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + i * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-[var(--bg-tertiary)] transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0 border border-accent-500/30 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm lg:text-base text-[var(--text-primary)] font-medium flex-1 pt-2 group-hover:text-accent-500 transition-colors">
                            {cert}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                {/* Skills Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="card sticky top-24 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border-2 border-primary-500/20"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold">Skills & Technologies</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {resume.skills?.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.7 + index * 0.03, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        className="badge hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white hover:border-transparent transition-all cursor-default shadow-sm hover:shadow-md"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Resume Download */}
                  <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
                    <a
                      href={
                        resume.resumeLink ||
                        'https://drive.google.com/file/d/1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy/view'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn w-full justify-center group bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 bg-size-200 hover:bg-pos-0 transition-all duration-300"
                      style={{ backgroundSize: '200% auto' }}
                    >
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Resume</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500/20 to-primary-500/20 flex items-center justify-center border border-secondary-500/30">
                        <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold">Let&apos;s Connect</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      <a
                        href={`mailto:${resume.contact?.email}`}
                        className="group flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-secondary-500/10 transition-all border border-transparent hover:border-primary-500/30"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 group-hover:scale-110 transition-all">
                          <FaEnvelope className="text-primary-500 text-lg group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm lg:text-base text-[var(--text-secondary)] group-hover:text-primary-500 transition-colors truncate flex-1">
                          {resume.contact?.email}
                        </span>
                        <svg className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <a
                        href={resume.contact?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-secondary-500/10 transition-all border border-transparent hover:border-primary-500/30"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 group-hover:scale-110 transition-all">
                          <FaLinkedin className="text-primary-500 text-lg group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm lg:text-base text-[var(--text-secondary)] group-hover:text-primary-500 transition-colors flex-1">
                          LinkedIn Profile
                        </span>
                        <svg className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <a
                        href={resume.contact?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-secondary-500/10 transition-all border border-transparent hover:border-primary-500/30"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 group-hover:scale-110 transition-all">
                          <FaGithub className="text-primary-500 text-lg group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm lg:text-base text-[var(--text-secondary)] group-hover:text-primary-500 transition-colors flex-1">
                          GitHub Repos
                        </span>
                        <svg className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)]/50">
                        <div className="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-secondary-500 text-lg" />
                        </div>
                        <span className="text-sm lg:text-base text-[var(--text-secondary)] flex-1">
                          {resume.contact?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </aside>
          </div>
        </motion.div>
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
