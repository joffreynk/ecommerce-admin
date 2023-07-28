import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, price, sizeId, colorId, categoryId, images, isArchived, isFeatured} = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated request", { status: 401 });
    }

    if (!name) {
      return new NextResponse("product name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("product price is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("product size ID is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("product color ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("product category ID is required", { status: 400 });
    }
    if (!images || !images.length ) {
      return new NextResponse("product images are required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isArchived,
        isFeatured,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string})=> image)
            ]
          }
        }
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error: any) {
    console.log("[CREATE BILLBOARDS ERROR]", error);
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new NextResponse(JSON.stringify(billboards), { status: 201 });
  } catch (error: any) {
    console.log("[GET BILLBOARDS ERROR]", error);
    return new NextResponse(error.message, { status: 500 });
  }
};
