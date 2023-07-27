import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
    }

    if (!name.length) {
      return new NextResponse("Label name must be provided", { status: 400 });
    }
    if (!billboardId.length) {
      return new NextResponse("Image URL must be provided", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error: any) {
    console.log("[CREATE CATEGORIES ERROR]", error);
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

    const categorories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new NextResponse(JSON.stringify(categorories), { status: 201 });
  } catch (error: any) {
    console.log("[GET CATEGORIES ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
