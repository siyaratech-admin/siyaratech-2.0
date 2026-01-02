
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
// import crypto from "crypto";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder", // Replace with env var
    key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret", // Replace with env var
});

export async function POST(req: Request) {
    try {
        const { amount, currency = "INR" } = await req.json();

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency,
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await instance.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { error: "Something went wrong while creating order" },
            { status: 500 }
        );
    }
}
