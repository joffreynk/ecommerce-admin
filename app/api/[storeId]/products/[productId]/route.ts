import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Billboard ID is requequired", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        color: true,
        category: true,
        size: true,
      },

    });
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error: any) {
    console.log("[GET PRODUCT ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();
    const { label, imgUrl } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
    }

    if (!label.length) {
      return new NextResponse("Label name must be provided", { status: 400 });
    }
    if (!imgUrl.length) {
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

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is requequired", { status: 400 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imgUrl,
        storeId: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (error: any) {
    console.log("[PATCH BILLBOARD ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is requequired", { status: 400 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });
    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (error: any) {
    console.log("[DELETE BILLBOARD ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
