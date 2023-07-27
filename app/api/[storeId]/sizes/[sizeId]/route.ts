import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is requequired", { status: 400 });
    }

    const size = await prismadb.size.findFirst({
      where: {
        id: params.sizeId,
      },
    });
    return new NextResponse(JSON.stringify(size), { status: 201 });
  } catch (error: any) {
    console.log("[GET SIZE ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
    }

    if (!name.length) {
      return new NextResponse("Size name must be provided", { status: 400 });
    }
    if (!value.length) {
      return new NextResponse("Size value must be provided", { status: 400 });
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

    if (!params.sizeId) {
      return new NextResponse("size ID is requequired", { status: 400 });
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,

      },
    });

    return new NextResponse(JSON.stringify(size), { status: 201 });
  } catch (error: any) {
    console.log("[PATCH SIZE ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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

    if (!params.sizeId) {
      return new NextResponse("Size ID is requequired", { status: 400 });
    }

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });
    return new NextResponse(JSON.stringify(size), { status: 201 });
  } catch (error: any) {
    console.log("[DELETE SIZE ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
