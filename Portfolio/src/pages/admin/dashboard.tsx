import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [projectForm, setProjectForm] = useState({ 
    title: '', 
    slug: '', 
    description: '', 
    link: '', 
    tags: '', 
    github: '', 
    image: '' 
  });
  const [articleForm, setArticleForm] = useState({ 
    title: '', 
    slug: '', 
    description: '', 
    date: new Date().toISOString().split('T')[0], 
    tags: '', 
    content: '' 
  });
  const [resumeForm, setResumeForm] = useState({ 
    summary: '', 
    skills: '', 
    resumeLink: '' 
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
     const fetchResume = async () => {
         try {
             // In a real app, you might want to fetch from your API
             // For now, we simulate or fetch if endpoint exists
             const res = await fetch('/api/resume');
             const data = await res.json();
             if (data.success && data.data) {
                 setResumeForm({
                     summary: data.data.summary || '',
                     skills: data.data.skills?.join(', ') || '',
                     resumeLink: data.data.resumeLink || ''
                 });
             }
         } catch (error) {
             console.error('Error fetching resume:', error);
         }
     };
     if (session) fetchResume();
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="container section flex items-center justify-center min-h-[60vh]">
         {/* Spinner */}
         <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-brand-blue/30 border-t-brand-blue animate-spin mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-secondary)]">Authenticating...</h2>
         </div>
      </div>
    );
  }

  if (!session) return null;

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ...projectForm, 
            tags: projectForm.tags.split(',').map(t => t.trim()) 
        })
    });
    if (res.ok) {
        alert('Project added successfully!');
        setProjectForm({ title: '', slug: '', description: '', link: '', tags: '', github: '', image: '' });
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ...articleForm, 
            tags: articleForm.tags.split(',').map(t => t.trim()) 
        })
    });
    if (res.ok) {
        alert('Article published successfully!');
        setArticleForm({ 
          title: '', 
          slug: '', 
          description: '', 
          date: new Date().toISOString().split('T')[0], 
          tags: '', 
          content: '' 
        });
    }
  };

  const handleResumeUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentRes = await fetch('/api/resume');
    const currentData = await currentRes.json();
    
    // Safety check just in case backend returns straightforward object
    const updatedResume = {
        ...(currentData.data || {}),
        summary: resumeForm.summary,
        skills: resumeForm.skills.split(',').map(s => s.trim()),
        resumeLink: resumeForm.resumeLink
    };

    const res = await fetch('/api/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResume)
    });
    if (res.ok) alert('Resume updated!');
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Portfolio</title>
      </Head>

      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[100px] -z-10" />

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full mb-4">
                 <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                 <span className="text-brand-blue font-bold text-xs tracking-wider uppercase">Admin Area</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2">Dashboard</h1>
              <p className="text-[var(--text-secondary)]">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue font-bold">{session.user?.name}</span>
              </p>
            </div>
            
            <button 
                onClick={() => signOut()}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-semibold"
            >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Project Section */}
            <section className="card group hover:border-brand-blue/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-blue opacity-50" />
              
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </span>
                Add New Project
              </h2>

              <form onSubmit={handleProjectSubmit} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Project Title <span className="text-brand-cyan">*</span></label>
                   <input className="form-input focus:border-brand-blue focus:shadow-brand-blue/10" placeholder="My Awesome Project" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Slug <span className="text-brand-cyan">*</span></label>
                   <input className="form-input focus:border-brand-blue focus:shadow-brand-blue/10" placeholder="my-awesome-project" value={projectForm.slug} onChange={e => setProjectForm({...projectForm, slug: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Description <span className="text-brand-cyan">*</span></label>
                   <textarea className="form-input min-h-[100px] focus:border-brand-blue focus:shadow-brand-blue/10" placeholder="Brief description of your project..." rows={3} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">GitHub URL</label>
                     <input className="form-input focus:border-brand-blue focus:shadow-brand-blue/10" placeholder="https://github.com/..." value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Live Link</label>
                     <input className="form-input focus:border-brand-blue focus:shadow-brand-blue/10" placeholder="https://..." value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Image URL</label>
                   <input 
                     className="form-input focus:border-brand-blue focus:shadow-brand-blue/10" 
                     placeholder="https://images.unsplash.com/... or /images/project.png" 
                     value={projectForm.image} 
                     onChange={e => setProjectForm({...projectForm, image: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Tags</label>
                   <input className="form-input focus:border-brand-blue focus:shadow-brand-blue/10" placeholder="React, Node.js, MongoDB (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} />
                 </div>
                 <button type="submit" className="btn w-full justify-center bg-gradient-to-r from-brand-blue to-brand-cyan hover:shadow-brand-blue/20 border-none">Publish Project</button>
              </form>
            </section>
    
            <div className="space-y-8">
                {/* Article Section */}
                <section className="card group hover:border-brand-violet/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-violet to-brand-cyan opacity-50" />
                    
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center text-brand-violet">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </span>
                        Write Article
                    </h2>
                    <form onSubmit={handleArticleSubmit} className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-sm font-semibold ml-1">Article Title</label>
                             <input className="form-input focus:border-brand-violet focus:shadow-brand-violet/10" placeholder="The Future of Web Dev" value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-semibold ml-1">Slug</label>
                             <input className="form-input focus:border-brand-violet focus:shadow-brand-violet/10" placeholder="future-of-web-dev" value={articleForm.slug} onChange={e => setArticleForm({...articleForm, slug: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-semibold ml-1">Summary</label>
                             <textarea className="form-input focus:border-brand-violet focus:shadow-brand-violet/10" placeholder="Brief summary of the article" value={articleForm.description} onChange={e => setArticleForm({...articleForm, description: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-semibold ml-1">Content (Markdown)</label>
                             <textarea className="form-input min-h-[150px] focus:border-brand-violet focus:shadow-brand-violet/10" placeholder="Write your content here..." rows={6} value={articleForm.content} onChange={e => setArticleForm({...articleForm, content: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn w-full justify-center bg-gradient-to-r from-brand-violet to-purple-500 hover:shadow-brand-violet/20 border-none">Publish Article</button>
                    </form>
                </section>
    
                {/* Resume Section */}
                <section className="card group hover:border-brand-cyan/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-blue opacity-50" />
                    
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </span>
                        Profile & Resume
                    </h2>
                    <form onSubmit={handleResumeUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Professional Summary</label>
                            <textarea className="form-input min-h-[100px] focus:border-brand-cyan focus:shadow-brand-cyan/10" rows={4} value={resumeForm.summary} onChange={e => setResumeForm({...resumeForm, summary: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Skills (Comma separated)</label>
                            <input className="form-input focus:border-brand-cyan focus:shadow-brand-cyan/10" value={resumeForm.skills} onChange={e => setResumeForm({...resumeForm, skills: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Resume Link</label>
                            <input className="form-input focus:border-brand-cyan focus:shadow-brand-cyan/10" value={resumeForm.resumeLink} onChange={e => setResumeForm({...resumeForm, resumeLink: e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-outline border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white w-full justify-center transition-all bg-transparent">
                            Update Profile Facts
                        </button>
                    </form>
                </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
