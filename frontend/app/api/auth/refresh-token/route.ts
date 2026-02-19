import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ accessToken: (session as any).accessToken });
}
