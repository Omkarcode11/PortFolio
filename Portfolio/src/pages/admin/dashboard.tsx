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
        <h2 className="text-2xl font-bold animate-pulse text-primary-500">Loading Dashboard...</h2>
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
    
    const updatedResume = {
        ...currentData.data,
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
    <div className="container section">
      <Head><title>Admin Dashboard | Portfolio</title></Head>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Welcome back, <span className="text-primary-500 font-semibold">{session.user?.name}</span></p>
        </div>
        <button className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => signOut()}>Sign Out</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Project Section */}
        <section className="card border-primary-500/20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-primary-500 rounded-full" />
            Add New Project
          </h2>
          <form onSubmit={handleProjectSubmit} className="space-y-6">
             <div className="space-y-2">
               <label className="text-sm font-semibold text-[var(--text-primary)]">Project Title *</label>
               <input className="form-input" placeholder="My Awesome Project" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-[var(--text-primary)]">Slug *</label>
               <input className="form-input" placeholder="my-awesome-project" value={projectForm.slug} onChange={e => setProjectForm({...projectForm, slug: e.target.value})} required />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-[var(--text-primary)]">Description *</label>
               <textarea className="form-input min-h-[100px]" placeholder="Brief description of your project..." rows={3} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-[var(--text-primary)]">GitHub URL</label>
                 <input className="form-input" placeholder="https://github.com/..." value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-[var(--text-primary)]">Live Link</label>
                 <input className="form-input" placeholder="https://..." value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-[var(--text-primary)]">Image URL</label>
               <input 
                 className="form-input" 
                 placeholder="https://images.unsplash.com/... or /images/project.png" 
                 value={projectForm.image} 
                 onChange={e => setProjectForm({...projectForm, image: e.target.value})}
               />
               <p className="text-xs text-[var(--text-secondary)] mt-1">
                 Tip: Use Unsplash or your own hosting for project images
               </p>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-[var(--text-primary)]">Tags</label>
               <input className="form-input" placeholder="React, Node.js, MongoDB (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} />
             </div>
             <button type="submit" className="btn w-full justify-center py-4 bg-primary-600 hover:bg-primary-700">Publish Project</button>
          </form>
        </section>

        <div className="space-y-8">
            {/* Article Section */}
            <section className="card border-blue-500/20">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-500 rounded-full" />
                    Write Article
                </h2>
                <form onSubmit={handleArticleSubmit} className="space-y-6">
                    <div className="space-y-2">
                         <label className="text-sm font-semibold">Article Title</label>
                         <input className="form-input" placeholder="The Future of Web Dev" value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-semibold">Slug</label>
                         <input className="form-input" placeholder="future-of-web-dev" value={articleForm.slug} onChange={e => setArticleForm({...articleForm, slug: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-semibold">Summary</label>
                         <textarea className="form-input" placeholder="Brief summary of the article" value={articleForm.description} onChange={e => setArticleForm({...articleForm, description: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-semibold">Content (Markdown)</label>
                         <textarea className="form-input min-h-[200px]" placeholder="Write your content here..." rows={8} value={articleForm.content} onChange={e => setArticleForm({...articleForm, content: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn w-full justify-center py-4 bg-sky-500 hover:bg-sky-600 border-none shadow-sky-500/20">Publish Article</button>
                </form>
            </section>

            {/* Resume Section */}
            <section className="card border-purple-500/20">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-purple-500 rounded-full" />
                    Profile & Resume
                </h2>
                <form onSubmit={handleResumeUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Professional Summary</label>
                        <textarea className="form-input min-h-[120px]" rows={4} value={resumeForm.summary} onChange={e => setResumeForm({...resumeForm, summary: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Skills (Comma separated)</label>
                        <input className="form-input" value={resumeForm.skills} onChange={e => setResumeForm({...resumeForm, skills: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Resume Link</label>
                        <input className="form-input" value={resumeForm.resumeLink} onChange={e => setResumeForm({...resumeForm, resumeLink: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-outline border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white w-full justify-center py-4 transition-all">
                        Update Profile Facts
                    </button>
                </form>
            </section>
        </div>
      </div>
    </div>
  );
}
