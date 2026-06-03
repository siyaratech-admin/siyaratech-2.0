// app/api/apply/route.ts  (Next.js App Router)
// If you're using Pages Router, adapt this to pages/api/apply.ts

import { NextRequest, NextResponse } from "next/server";

const ERP_URL = process.env.ERP_URL ?? "http://127.0.0.1:8000";
const ERP_API_KEY = process.env.ERP_API_KEY ?? "fc3272c1f8cb40b";
const ERP_API_SECRET = process.env.ERP_API_SECRET ?? "0add95572f83a45";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // ── Build the ERPNext doc payload ──────────────────────────────────────
    const doc: Record<string, string> = {
      doctype: "Job Applicant",
      applicant_name: String(formData.get("applicant_name") ?? ""),
      email_id: String(formData.get("email_id") ?? ""),
      phone_number: String(formData.get("phone_number") ?? ""),
      country: String(formData.get("country") ?? ""),
      job_title: String(formData.get("job_title") ?? ""),
      cover_letter: String(formData.get("cover_letter") ?? ""),
      resume_link: String(formData.get("resume_link") ?? ""),
      source: String(formData.get("source") ?? ""),
      status: "Open",
    };

    // ── 1. Create the Job Applicant record ────────────────────────────────
    const createRes = await fetch(`${ERP_URL}/api/resource/Job Applicant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${ERP_API_KEY}:${ERP_API_SECRET}`,
      },
      body: JSON.stringify(doc),
    });

    if (!createRes.ok) {
      const errBody = await createRes.json().catch(() => ({}));
      const message =
        errBody?.exception ??
        errBody?.message ??
        `ERPNext returned ${createRes.status}`;
      return NextResponse.json(
        { error: message },
        { status: createRes.status },
      );
    }

    const created = await createRes.json();
    const applicantName: string = created?.data?.name; // e.g. "HR-APP-2024-00042"

    // ── 2. Upload resume if provided ──────────────────────────────────────
    const resumeFile = formData.get("resume_attachment") as File | null;
    if (resumeFile && resumeFile.size > 0 && applicantName) {
      const uploadForm = new FormData();
      uploadForm.append("file", resumeFile, resumeFile.name);
      uploadForm.append("doctype", "Job Applicant");
      uploadForm.append("docname", applicantName);
      uploadForm.append("fieldname", "resume_attachment");
      uploadForm.append("is_private", "1");

      // Fire-and-forget; don't fail the whole submission if upload errors
      await fetch(`${ERP_URL}/api/method/upload_file`, {
        method: "POST",
        headers: {
          Authorization: `token ${ERP_API_KEY}:${ERP_API_SECRET}`,
        },
        body: uploadForm,
      }).catch((e) => console.error("Resume upload failed:", e));
    }

    return NextResponse.json({ success: true, name: applicantName });
  } catch (err) {
    console.error("[api/apply]", err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 },
    );
  }
}
