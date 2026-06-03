"use client";
import React, { useEffect, useState, useCallback } from "react";

import HeroSection from "@/components/HeroSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Rocket, Target, Globe, Heart, Coffee, Award,
  ArrowRight, Briefcase, MapPin, Loader2, AlertCircle, RefreshCw,
  X, Upload, CheckCircle2, ChevronDown, Search,
} from "lucide-react";

// ─── Config ────────────────────────────────────────────────────────────────
const ERP_PUBLIC_URL = process.env.NEXT_PUBLIC_ERP_URL ?? "http://127.0.0.1:8000";
const REFRESH_INTERVAL = 30_000;
const VISIBLE_CARDS = 3;
const CARD_HEIGHT_PX = 160;

// ─── Types ─────────────────────────────────────────────────────────────────
interface JobOpening {
  name: string;
  job_title: string;
  department?: string;
  location?: string;
  status?: string;
  description?: string;
  employment_type?: string;
  designation?: string;
}

interface ApplicationForm {
  applicant_name: string;
  email_id: string;
  phone_number: string;
  country: string;
  job_title: string;         // Link → Job Opening name
  cover_letter: string;
  resume_link: string;
  resume_attachment: File | null;
  source: string;
}

const EMPTY_FORM: ApplicationForm = {
  applicant_name: "",
  email_id: "",
  phone_number: "",
  country: "",
  job_title: "",
  cover_letter: "",
  resume_link: "",
  resume_attachment: null,
  source: "",
};

// Source options from ERPNext Job Applicant Source
const SOURCE_OPTIONS = [
  "Campaign",
  "Employee Referral",
  "Walk In",
  "Website Listing",
];

// ─── Searchable Job Combobox ────────────────────────────────────────────────
interface JobComboboxProps {
  jobs: JobOpening[];
  value: string;           // Job Opening `name` (ERPNext id)
  onChange: (val: string) => void;
}

function JobCombobox({ jobs, value, onChange }: JobComboboxProps) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const inputRef          = React.useRef<HTMLInputElement>(null);
  const listRef           = React.useRef<HTMLUListElement>(null);

  const selected = jobs.find(j => j.name === value) ?? null;

  const filtered = query.trim() === ""
    ? jobs
    : jobs.filter(j =>
        j.job_title.toLowerCase().includes(query.toLowerCase()) ||
        (j.department ?? "").toLowerCase().includes(query.toLowerCase())
      );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!inputRef.current?.parentElement?.contains(target) &&
          !listRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (job: JobOpening) => {
    onChange(job.name);
    setQuery("");
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">
        Job Opening{" "}
        <span className="text-muted-foreground text-xs font-normal">(optional)</span>
      </label>

      {/* Trigger / search input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <input
          ref={inputRef}
          type="text"
          placeholder={selected ? selected.job_title : "Search or select a position…"}
          value={open ? query : (selected ? selected.job_title : query)}
          onFocus={() => { setOpen(true); setQuery(""); }}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          className={`
            w-full rounded-lg border bg-background pl-9 pr-8 py-2.5 text-sm
            placeholder:text-muted-foreground focus:outline-none focus:ring-2
            focus:ring-primary/40 transition
            ${selected && !open ? "border-primary/40 text-foreground" : "border-border"}
          `}
        />

        {/* Clear button when a value is selected */}
        {selected && !open ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <ChevronDown
            className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="relative z-20">
          <ul
            ref={listRef}
            className="absolute top-1 left-0 right-0 rounded-xl border border-border bg-card shadow-xl overflow-y-auto max-h-48"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                No positions match &ldquo;{query}&rdquo;
              </li>
            ) : (
              filtered.map(j => (
                <li
                  key={j.name}
                  onMouseDown={() => handleSelect(j)}   // mousedown fires before blur
                  className={`
                    flex items-center justify-between gap-3 px-4 py-3 cursor-pointer
                    text-sm transition-colors hover:bg-primary/10
                    ${j.name === value ? "bg-primary/10 text-primary font-medium" : ""}
                  `}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Briefcase className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{j.job_title}</span>
                    {j.department && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {j.department}
                      </span>
                    )}
                  </span>
                  {j.employment_type && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {j.employment_type}
                    </Badge>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Selected confirmation chip */}
      {selected && !open && (
        <p className="text-xs text-primary flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Position selected
        </p>
      )}
    </div>
  );
}

// ─── Application Modal ──────────────────────────────────────────────────────
interface ApplicationModalProps {
  job: JobOpening | null;     // null = "send resume" (no pre-selected job)
  jobs: JobOpening[];         // full list for the "general" dropdown
  onClose: () => void;
}

function ApplicationModal({ job, jobs, onClose }: ApplicationModalProps) {
  const [form, setForm] = useState<ApplicationForm>({
    ...EMPTY_FORM,
    job_title: job?.name ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent background scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (field: keyof ApplicationForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleFile = (file: File | null) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setSubmitError("Only PDF or Word documents are accepted.");
      return;
    }
    setSubmitError(null);
    setForm(prev => ({ ...prev, resume_attachment: file }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!form.applicant_name.trim()) { setSubmitError("Name is required."); return; }
    if (!form.email_id.trim()) { setSubmitError("Email is required."); return; }
    if (!form.email_id.includes("@")) { setSubmitError("Enter a valid email."); return; }
    setSubmitError(null);
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("applicant_name", form.applicant_name.trim());
      payload.append("email_id", form.email_id.trim());
      payload.append("phone_number", form.phone_number.trim());
      payload.append("country", form.country.trim());
      payload.append("job_title", form.job_title);
      payload.append("cover_letter", form.cover_letter.trim());
      payload.append("resume_link", form.resume_link.trim());
      payload.append("source", form.source);
      payload.append("status", "Open");
      if (form.resume_attachment) payload.append("resume_attachment", form.resume_attachment);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? `Submission failed (${res.status})`);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "hsl(var(--background) / 0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 bg-card shadow-2xl"
        style={{ animation: "modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl border-b border-border/40 bg-card/95 px-6 py-5 backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-bold">
              {submitted ? "Application Submitted!" : (job ? "Apply for Position" : "Send Us Your Resume")}
            </h2>
            {!submitted && job && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {job.job_title}
                {job.department && ` · ${job.department}`}
                {job.location && ` · ${job.location}`}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary" />
            <h3 className="text-2xl font-bold">Thank you, {form.applicant_name.split(" ")[0]}!</h3>
            <p className="text-muted-foreground max-w-sm">
              We've received your application and will be in touch soon.
            </p>
            <Button
              className="mt-4 bg-gradient-to-r from-primary to-chart-1 text-primary-foreground hover:scale-105 transition-transform"
              onClick={onClose}
            >
              Back to Careers
            </Button>
          </div>
        ) : (
          /* Form */
          <div className="px-6 py-6 space-y-6">

            {/* Personal Details */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                Personal Details
              </legend>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={form.applicant_name}
                  onChange={set("applicant_name")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email_id}
                    onChange={set("email_id")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone_number}
                    onChange={set("phone_number")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Country</label>
                <input
                  type="text"
                  placeholder="India"
                  value={form.country}
                  onChange={set("country")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>
            </fieldset>

            {/* Job Opening */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                Position
              </legend>

              {job ? (
                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{job.job_title}</span>
                  {job.employment_type && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      {job.employment_type}
                    </Badge>
                  )}
                </div>
              ) : (
                <JobCombobox
                  jobs={jobs}
                  value={form.job_title}
                  onChange={(val) => setForm(prev => ({ ...prev, job_title: val }))}
                />
              )}

              {/* Source */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">How did you hear about us?</label>
                <div className="relative">
                  <select
                    value={form.source}
                    onChange={set("source")}
                    className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition pr-8"
                  >
                    <option value="">Select a source</option>
                    {SOURCE_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </fieldset>

            {/* Resume Section */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                Resume
              </legend>

              {/* File drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
                className={`
                  relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8
                  transition-colors cursor-pointer
                  ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}
                `}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
                {form.resume_attachment ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                    <p className="text-sm font-medium">{form.resume_attachment.name}</p>
                    <p className="text-xs text-muted-foreground">Click to replace</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Drop your resume here</p>
                    <p className="text-xs text-muted-foreground">PDF or Word · Max 5 MB</p>
                  </>
                )}
              </div>

              {/* Resume Link */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Or paste a link (LinkedIn, Drive, etc.)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={form.resume_link}
                  onChange={set("resume_link")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>
            </fieldset>

            {/* Cover Letter */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                Cover Letter
              </legend>
              <textarea
                rows={5}
                placeholder="Tell us why you're a great fit for this role…"
                value={form.cover_letter}
                onChange={set("cover_letter")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
              />
            </fieldset>

            {/* Error */}
            {submitError && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {submitError}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground hover:scale-105 transition-transform duration-200 min-w-[120px]"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting…</>
                ) : (
                  <>Submit Application <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Keyframe for modal pop-in */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Modal state: null = closed, job object = open for that job, "general" = open without a job
  const [activeJob, setActiveJob] = useState<JobOpening | null | "general">(undefined as unknown as null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (job: JobOpening | null) => {
    setActiveJob(job);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchJobs = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/jobs?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? `Request failed with status ${res.status}`);
      }

      const json = await res.json();
      setJobs(json.data ?? []);
      setLastUpdated(new Date());
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchJobs(false); }, [fetchJobs]);
  useEffect(() => {
    const id = setInterval(() => fetchJobs(true), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetchJobs]);

  const needsScroll = jobs.length > VISIBLE_CARDS;
  const scrollMaxHeight = VISIBLE_CARDS * CARD_HEIGHT_PX + (VISIBLE_CARDS - 1) * 24;

  return (
    <div className="pt-16">
      {/* Application Modal */}
      {modalOpen && (
        <ApplicationModal
          job={activeJob === "general" ? null : (activeJob ?? null)}
          jobs={jobs}
          onClose={closeModal}
        />
      )}

      <HeroSection
        title="Join Our Team"
        subtitle="Shape the Future of Technology"
        description="Work with cutting-edge technologies, solve complex challenges, and help build the future alongside passionate, talented colleagues."
        primaryCTA="View Open Positions"
        secondaryCTA="Learn About Culture"
        onPrimaryCTA={() => {
          document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
        }}
        onSecondaryCTA={() => {}}
        showStats={false}
      />

      {/* Why Work Here */}
      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Why Siyaratech
            </Badge>
            <h2 className="text-3xl font-bold mb-4">More Than Just a Job</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in creating an environment where innovation thrives,
              careers grow, and people love coming to work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: "Cutting-Edge Projects",  description: "Work on innovative AI, web, and digital transformation projects for leading companies." },
              { icon: Target, title: "Career Growth",          description: "Clear advancement paths, mentorship programs, and ₹4.7 lakh annual learning budget." },
              { icon: Globe,  title: "Remote-First Culture",   description: "Work from anywhere with flexible hours and quarterly team retreats." },
              { icon: Heart,  title: "Health & Wellness",      description: "Comprehensive health insurance, mental health support, and wellness stipends." },
              { icon: Coffee, title: "Work-Life Balance",      description: "Unlimited PTO, sabbatical options, and respect for personal time." },
              { icon: Award,  title: "Competitive Package",    description: "Top-tier compensation, equity participation, and performance bonuses." },
            ].map((benefit, index) => (
              <Card key={index} className="p-6 border-border/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <benefit.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 relative">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Open Positions
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our current openings and find the perfect role to advance your career.
            </p>

            <div className="flex items-center justify-center gap-3 mt-4">
              {lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => fetchJobs(true)}
                disabled={refreshing || loading}
                className="flex items-center gap-1 text-xs text-primary hover:underline disabled:opacity-40 transition-opacity"
              >
                <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing…" : "Refresh"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p>Fetching open positions…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertCircle className="w-10 h-10 text-destructive" />
              <p className="text-center max-w-lg text-destructive">Could not load job openings.</p>
              <p className="text-xs text-muted-foreground text-center max-w-lg">{error}</p>
              <Button variant="outline" size="sm" onClick={() => fetchJobs(false)}>
                Try Again
              </Button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No open positions at the moment.</p>
              <p className="mt-2 text-sm">Check back soon or send us your resume below.</p>
            </div>
          )}

          {/* Job Cards */}
          {!loading && !error && jobs.length > 0 && (
            <div className={`transition-opacity duration-300 ${refreshing ? "opacity-60" : "opacity-100"}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {jobs.length} open {jobs.length === 1 ? "position" : "positions"}
                </span>
                {needsScroll && (
                  <span className="text-xs text-muted-foreground italic">
                    Scroll to see all {jobs.length} roles ↓
                  </span>
                )}
              </div>

              <div className="relative">
                <div
                  className={`space-y-6 ${needsScroll
                    ? "overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                    : "overflow-visible"}`}
                  style={needsScroll ? { maxHeight: `${scrollMaxHeight}px` } : undefined}
                >
                  {jobs.map((position) => (
                    <Card
                      key={position.name}
                      className="p-6 border-border/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2 flex-wrap">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {position.job_title}
                            </h3>
                            {position.employment_type && (
                              <Badge
                                variant="outline"
                                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                              >
                                {position.employment_type}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-muted-foreground mb-3 flex-wrap text-sm">
                            {position.department && (
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {position.department}
                              </span>
                            )}
                            {position.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {position.location}
                              </span>
                            )}
                            {position.designation && <span>{position.designation}</span>}
                          </div>

                          {position.description && (
                            <div
                              className="text-muted-foreground text-sm line-clamp-2 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: position.description }}
                            />
                          )}
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 shrink-0">
                          <Button
                            onClick={() => openModal(position)}
                            className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground hover:scale-105 transition-transform duration-200"
                          >
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {needsScroll && (
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 rounded-b-xl"
                    style={{
                      background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.85) 100%)",
                    }}
                  />
                )}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Don&apos;t see the perfect role? We&apos;re always looking for exceptional talent.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-200"
              onClick={() => openModal(null)}
            >
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}