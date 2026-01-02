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
      <div className="container section">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>About | Omkar Sonawane</title>
      </Head>
      <section className="container section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">About Me</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
            <div>
              <p className="text-lg text-[var(--text-primary)] mb-8 leading-relaxed">
                {resume.summary}
              </p>

              {/* Experience */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <div className="flex flex-col gap-10">
                  {resume.experience?.map((job, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary-500 pl-6 relative"
                    >
                      <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 rounded-full bg-primary-500" />
                      <h3 className="text-xl font-bold mb-1">{job.role}</h3>
                      <p className="text-primary-500 font-semibold text-sm mb-2">
                        {job.company} • {job.duration}
                      </p>
                      <p className="mb-3">{job.description}</p>
                      {job.highlights && (
                        <ul className="pl-5 text-sm text-[var(--text-secondary)] space-y-1 list-disc">
                          {job.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="border-l-2 border-[var(--border-color)] pl-6 mb-6">
                  <h3 className="text-lg font-bold mb-1">
                    {resume.education?.degree}
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    {resume.education?.university}
                    <br />
                    <span className="font-semibold">{resume.education?.year}</span>
                  </p>
                </div>
              </div>

              {/* Certifications */}
              {resume.certifications && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Certifications</h2>
                  <ul className="pl-5 text-[var(--text-secondary)] space-y-2 list-disc">
                    {resume.certifications.map((cert, i) => (
                      <li key={i}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="card sticky top-24">
                <h3 className="text-xl font-bold mb-6">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href={
                      resume.resumeLink ||
                      'https://drive.google.com/file/d/1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy/view'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full justify-center py-4"
                  >
                    View Full Resume
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                  <h4 className="text-lg font-bold mb-4">Connect with me</h4>
                  <div className="flex flex-col gap-4">
                    <a
                      href={`mailto:${resume.contact?.email}`}
                      className="flex items-center gap-3 text-[var(--text-secondary)] text-sm hover:text-primary-500 transition-colors"
                    >
                      <FaEnvelope className="text-primary-500" />
                      {resume.contact?.email}
                    </a>
                    <a
                      href={resume.contact?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[var(--text-secondary)] text-sm hover:text-primary-500 transition-colors"
                    >
                      <FaLinkedin className="text-primary-500" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={resume.contact?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[var(--text-secondary)] text-sm hover:text-primary-500 transition-colors"
                    >
                      <FaGithub className="text-primary-500" />
                      GitHub Repos
                    </a>
                    <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                      <FaMapMarkerAlt className="text-primary-500" />
                      {resume.contact?.location}
                    </div>
                  </div>
                </div>
              </div>
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
