import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId)
      return new NextResponse("Unauthorize request", { status: 401 });

    const { name } = await req.json();
    if (!name)
      return new NextResponse("name must be provided", { status: 400 });

    
  } catch (error: any) {
    console.log('[UPDATE STORE ERROR]', error)
    return new NextResponse(error.message, {status: 500})
  }
};
