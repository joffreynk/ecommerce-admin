import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
    }

    if (!name.length) {
      return new NextResponse("color name must be provided", { status: 400 });
    }
    if (!value.length) {
      return new NextResponse("color Value must be provided", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is requequired", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UnAuthorized request", { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(color), { status: 201 });
  } catch (error: any) {
    console.log("[CREATE COLORS ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is requequired", { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new NextResponse(JSON.stringify(colors), { status: 201 });
  } catch (error: any) {
    console.log("[GET COLORS ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
