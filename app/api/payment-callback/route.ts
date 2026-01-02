
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Log the payment callback details
    const url = new URL(req.url);
    console.log("Payment Callback GET params:", Object.fromEntries(url.searchParams));

    // Redirect to success page
    return NextResponse.redirect(new URL("/courses?payment=success", req.url));
}

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get("content-type") || "";
        let body = {};
        if (contentType.includes("application/json")) {
            body = await req.json();
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await req.formData();
            body = Object.fromEntries(formData);
        }

        console.log("Payment Callback POST body:", body);

        // Redirect to success page
        // Note: If this is a server-to-server call, redirecting might not affect the user if they are not the caller.
        // But typically for 'redirectUrl' flow, the user's browser makes the POST.
        return NextResponse.redirect(new URL("/courses?payment=success", req.url), 303);
    } catch (error) {
        console.error("Error processing payment callback:", error);
        return NextResponse.redirect(new URL("/courses?payment=error", req.url));
    }
}
