import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    // Use Better Auth's verification handler
    const result = await auth.api.verifyEmail({
      query: { token },
      headers: request.headers,
    });

    if (result && result.status) {
      return NextResponse.json(
        { message: "Email verified successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Email verification failed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Email verification error:", error);
    
    // Handle specific error types
    if (error.message?.includes("expired")) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 410 }
      );
    }
    
    if (error.message?.includes("invalid")) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Email verification failed" },
      { status: 500 }
    );
  }
}
