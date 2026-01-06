import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;
    const erpnextUrl = process.env.NEXT_PUBLIC_ERPNEXT_URL;

    if (!apiKey || !apiSecret || !erpnextUrl) {
      return NextResponse.json(
        { error: 'ERPNext API credentials or URL not found' },
        { status: 500 }
      );
    }

    const formData: ContactData = await request.json();

    // Step 1: Create Contact
    console.log('Creating contact for:', formData.email);

    const contactPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email_id: formData.email,
      phone: formData.phone,
      mobile_no: formData.phone,
      designation: "Enquirer",
      department: "Support",
      description: formData.description
    };

    const contactResponse = await fetch(`${erpnextUrl}/api/resource/Contact`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(contactPayload)
    });

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text();
      console.error('Contact creation failed:', errorText);
      return NextResponse.json(
        { error: `Failed to create contact: ${contactResponse.status}` },
        { status: contactResponse.status }
      );
    }

    const contactResult = await contactResponse.json();
    console.log('Contact created successfully:', contactResult);

    // Step 2: Create CRM Lead
    console.log('Creating CRM Lead for:', formData.email);

    const leadPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      lead_name: `${formData.firstName} ${formData.lastName}`,
      email_id: formData.email,
      phone: formData.phone,
      company_name: formData.company,
      description: formData.description
    };

    const leadResponse = await fetch(`${erpnextUrl}/api/resource/CRM Lead`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(leadPayload)
    });

    if (!leadResponse.ok) {
      const errorText = await leadResponse.text();
      console.error('CRM Lead creation failed:', errorText);
      console.log('Returning 417 with validation details'); // Added log for debugging

      // Return partial success since contact was created
      // Fixing the syntax error here by returning a proper JSON response
      return NextResponse.json({
        success: true,
        contact: contactResult,
        lead: null,
        warning: `Contact created but CRM Lead creation failed: ${leadResponse.status}`,
        details: errorText // Include the actual validation message
      }, { status: 417 });
    }

    const leadResult = await leadResponse.json();
    console.log('CRM Lead created successfully:', leadResult);

    return NextResponse.json({
      success: true,
      contact: contactResult,
      lead: leadResult,
      message: 'Contact and lead created successfully'
    });

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
