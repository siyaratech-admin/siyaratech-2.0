import { NextRequest, NextResponse } from 'next/server';

const ERP_URL    = process.env.NEXT_PUBLIC_ERPNEXT_URL  ?? "http://127.0.0.1:8000";
const API_KEY    = process.env.ERPNEXT_API_KEY          ?? "fc3272c1f8cb40b";
const API_SECRET = process.env.ERPNEXT_API_SECRET       ?? "0add95572f83a45";
const AUTH       = `token ${API_KEY}:${API_SECRET}`;
const HEADERS    = {
  Authorization:  AUTH,
  "Content-Type": "application/json",
  Accept:         "application/json",
};

interface ContactFormData {
  firstName:       string;
  lastName:        string;
  email:           string;
  phone:           string;
  company:         string;
  serviceInterest: string;
  description:     string;
  budget:          string;
}

async function erpPost(endpoint: string, payload: object) {
  const res = await fetch(`${ERP_URL}/api/resource/${endpoint}`, {
    method:  "POST",
    headers: HEADERS,
    body:    JSON.stringify(payload),
  });
  const raw = await res.text();
  let data: unknown = null;
  try { data = JSON.parse(raw); } catch { /* HTML page — keep raw */ }
  console.log(`[contact] POST ${endpoint} → ${res.status}`, raw.slice(0, 600));
  return { ok: res.ok, status: res.status, data, raw };
}

export async function POST(request: NextRequest) {
  try {
    const form: ContactFormData = await request.json();
    const {
      firstName       = "",
      lastName        = "",
      email           = "",
      phone           = "",
      company         = "",
      serviceInterest = "",
      description     = "",
      budget          = "",
    } = form;

    const fullName = `${firstName} ${lastName}`.trim();
    // Strip +91 / country code — ERPNext stores just the local number
    const cleanPhone = phone.replace(/^\+91/, "").replace(/\D/g, "");

    // ── Step 1 · Create Contact ──────────────────────────────────────────────
    console.log("[contact] Creating Contact for:", email);

    const contactResult = await erpPost("Contact", {
      first_name:  firstName,
      last_name:   lastName,
      mobile_no:   cleanPhone,
      designation: "Enquirer",
      email_ids:   [{ email_id: email, is_primary: 1 }],
      phone_nos:   [{ phone: cleanPhone, is_primary_mobile_no: 1 }],
    });

    if (!contactResult.ok) {
      console.error("[contact] Contact creation failed:", contactResult.raw);
      return NextResponse.json(
        { error: `Contact creation failed (${contactResult.status})`, detail: contactResult.raw },
        { status: 502 }
      );
    }

    // ── Step 2 · Create Lead ─────────────────────────────────────────────────
    // ✅ 'source' removed — "Website" doesn't exist in Lead Source master.
    // ✅ 'website' is a plain Data field — safe to set to our domain.
    // ✅ Extra enquiry details go into 'remarks' (plain Text field).
    console.log("[contact] Creating Lead for:", email);

    const leadResult = await erpPost("Lead", {
      naming_series:        "CRM-LEAD-.YYYY.-",
      lead_name:            fullName,
      first_name:           firstName,
      last_name:            lastName,
      email_id:             email,
      mobile_no:            cleanPhone,
      company_name:         company,
      company:              "Siyaratech (Demo)",
      website:              "https://siyaratechin.com",  // plain URL field — always valid
      status:               "Lead",
      lead_owner:           "Administrator",
      qualification_status: "Unqualified",
      no_of_employees:      "1-10",
      country:              "India",
      language:             "en",
      disabled:             0,
      unsubscribed:         0,
      blog_subscriber:      0,
      notes:                [],
      remarks: `Service Interest: ${serviceInterest} | Budget: ${budget}\n\n${description}`,
    });

    if (!leadResult.ok) {
      console.error("[contact] Lead creation failed:", leadResult.raw);
      return NextResponse.json(
        {
          success: true,
          contact: contactResult.data,
          lead:    null,
          warning: `Contact created but Lead creation failed (${leadResult.status})`,
          detail:  leadResult.raw,
        },
        { status: 207 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: contactResult.data,
      lead:    leadResult.data,
      message: "Contact and Lead created successfully in ERPNext",
    });

  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}