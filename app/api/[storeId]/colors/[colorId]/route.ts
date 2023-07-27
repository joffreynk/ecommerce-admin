import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId) {
      return new NextResponse("color ID is requequired", { status: 400 });
    }

    const color = await prismadb.color.findFirst({
      where: {
        id: params.colorId,
      },
    });
    return new NextResponse(JSON.stringify(color), { status: 201 });
  } catch (error: any) {
    console.log("[GET COLOR ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
      return new NextResponse("color value must be provided", { status: 400 });
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

    if (!params.colorId) {
      return new NextResponse("color ID is requequired", { status: 400 });
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,

      },
    });

    return new NextResponse(JSON.stringify(color), { status: 201 });
  } catch (error: any) {
    console.log("[PATCH COLOR ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("color ID is requequired", { status: 400 });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });
    return new NextResponse(JSON.stringify(color), { status: 201 });
  } catch (error: any) {
    console.log("[DELETE COLOR ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
