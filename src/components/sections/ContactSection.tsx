import React, { useState } from "react";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
  honeypot: string; // Anti-spam honeypot
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "AI Applications",
    message: "",
    budget: "",
    timeline: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const constructMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Project Inquiry from ${formData.name || "Client"}${formData.company ? ` (${formData.company})` : ""}`
    );
    const body = encodeURIComponent(
      `Hi Omkar,\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.service}\nBudget: ${formData.budget || "Not specified"}\nTimeline: ${formData.timeline || "Not specified"}\n\nProject Details:\n${formData.message}\n`
    );
    return `mailto:omkarsonawaneomkar2@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyInquiry = () => {
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.service}\nBudget: ${formData.budget || "Not specified"}\nTimeline: ${formData.timeline || "Not specified"}\n\nProject Details:\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please provide your name." });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus({ type: "error", message: "Please provide a valid email address." });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({
        type: "error",
        message: "Please describe what you are looking to build (minimum 10 characters).",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your project inquiry has been recorded. I review all inquiries and respond within 24 hours.",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to submit. Please email directly.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({
        type: "error",
        message: "Network error. Please use direct email below.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-(--bg-primary) relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-violet/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
            <span>Let's Build</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            Tell me what you're trying to build, automate or improve. I'll help you figure out the right technical approach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 max-w-6xl mx-auto items-start">
          {/* Direct Channels & Value Prop */}
          <div className="p-8 sm:p-10 rounded-3xl bg-(--bg-secondary)/40 border border-(--border-color) space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-(--text-primary) mb-3">
                Start a Conversation
              </h3>
              <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                Whether you need a full product built from scratch, an AI integration, Shopify optimization, or custom workflow automation, reach out directly.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href="mailto:omkarsonawaneomkar2@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <MailIcon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-(--text-tertiary)">Email Directly</div>
                  <div className="text-sm font-bold text-(--text-primary) group-hover:text-brand-blue transition-colors truncate">
                    omkarsonawaneomkar2@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/omkardev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-(--bg-card) border border-(--border-color) hover:border-[#0077b5]/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#0077b5] flex items-center justify-center shrink-0">
                  <LinkedInIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-(--text-tertiary)">LinkedIn</div>
                  <div className="text-sm font-bold text-(--text-primary) group-hover:text-[#0077b5] transition-colors">
                    linkedin.com/in/omkardev
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/Omkarcode11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <GitHubIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-(--text-tertiary)">GitHub Code</div>
                  <div className="text-sm font-bold text-(--text-primary) group-hover:text-brand-blue transition-colors">
                    github.com/Omkarcode11
                  </div>
                </div>
              </a>
            </div>

            {/* Response Time Guarantee */}
            <div className="p-4 rounded-2xl bg-(--bg-card) border border-(--border-color) text-xs sm:text-sm text-(--text-secondary) flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Typically responding within 24 hours (IST timezone / global clients welcome).</span>
            </div>
          </div>

          {/* Project Inquiry Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-(--bg-card) border border-(--border-color) shadow-xl shadow-slate-900/5">
            <h3 className="text-xl sm:text-2xl font-bold text-(--text-primary) mb-2">
              Project Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-(--text-secondary) mb-6">
              Fill out the details below. You can also open this directly in your email client.
            </p>

            {status.type === "success" ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-(--text-primary)">
                  Inquiry Received!
                </h4>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  {status.message}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={constructMailtoUrl()}
                    className="btn text-xs py-3 px-6 bg-emerald-500 hover:bg-emerald-600"
                  >
                    Open in Email App
                  </a>
                  <button
                    onClick={() => {
                      setStatus({ type: "idle", message: "" });
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "AI Applications",
                        message: "",
                        budget: "",
                        timeline: "",
                        honeypot: "",
                      });
                    }}
                    className="btn btn-secondary text-xs py-3 px-6"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot for bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input text-sm py-3 px-4"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input text-sm py-3 px-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                      Company / Business <span className="text-(--text-tertiary) font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input text-sm py-3 px-4"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                      Primary Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-input text-sm py-3 px-4 bg-(--bg-secondary)"
                    >
                      <option value="AI Applications">AI Applications &amp; LLM Integrations</option>
                      <option value="Shopify Solutions">Shopify Solutions &amp; Extensions</option>
                      <option value="Business Automation">Business &amp; Workflow Automation</option>
                      <option value="Backend Systems">Backend APIs &amp; Dashboards</option>
                      <option value="Full-Stack MVP">Full-Stack SaaS MVP</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                      Estimated Budget <span className="text-(--text-tertiary) font-normal">(Optional)</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-input text-sm py-3 px-4 bg-(--bg-secondary)"
                    >
                      <option value="">Select a range</option>
                      <option value="<$1,000">&lt; $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 – $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 – $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                      Target Timeline <span className="text-(--text-tertiary) font-normal">(Optional)</span>
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="form-input text-sm py-3 px-4 bg-(--bg-secondary)"
                    >
                      <option value="">Select target timeline</option>
                      <option value="Immediately (1-2 weeks)">Immediately (1–2 weeks)</option>
                      <option value="2-4 weeks">2–4 weeks</option>
                      <option value="1-2 months">1–2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-1.5">
                    What are you looking to build? <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe your project, problem, or workflow you want to automate..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input text-sm py-3 px-4 resize-y"
                  />
                </div>

                {status.type === "error" && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                    {status.message}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn w-full sm:w-auto px-8 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-sm rounded-full disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Project Inquiry"}
                  </button>

                  <a
                    href={constructMailtoUrl()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-full border border-(--border-color) transition-all w-full sm:w-auto"
                  >
                    <span>Open in Email</span>
                    <span>↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="text-xs text-(--text-tertiary) hover:text-brand-blue transition-colors cursor-pointer py-2 px-1"
                  >
                    {copied ? "✓ Copied to clipboard" : "Copy details to clipboard"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
