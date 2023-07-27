import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return new NextResponse("category ID is requequired", { status: 400 });
    }

    const category = await prismadb.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });
    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error: any) {
    console.log("[GET CATEGORY ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
    }

    if (!name.length) {
      return new NextResponse("Category name must be provided", { status: 400 });
    }
    if (!billboardId.length) {
      return new NextResponse("billboard ID must be provided", { status: 400 });
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

    if (!params.categoryId) {
      return new NextResponse("category ID is requequired", { status: 400 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error: any) {
    console.log("[PATCH BILLBOARD ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
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

    if (!params.categoryId) {
      return new NextResponse("Category ID is requequired", { status: 400 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    });
    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error: any) {
    console.log("[DELETE CATEGORY ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
