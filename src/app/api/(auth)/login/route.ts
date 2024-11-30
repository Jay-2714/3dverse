import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const { userId, token } = await req.json();
 console.log(userId, token);
 
  if (!userId || !token) {
    return NextResponse.json({ error: "Missing userId or token" });
  }

  try {
    await prisma.token.upsert({
      where: { token },
      update: { token },
      create: { userId, token },
    });

    return NextResponse.json({ message: "Token stored successfully" });
  } catch (error) {
    console.error("Error storing token:", error);
   return NextResponse.json({ error: "Internal Server Error" });
  }
}
