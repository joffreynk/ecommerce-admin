import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, {params}: {params: {storeId: string}},) => {
  try {
    const { userId } = auth();
    if (!userId){
      return new NextResponse("Unauthorize request", { status: 401 });
    }

    const { name } = await req.json();
    if (!name){
      return new NextResponse("name must be provided", { status: 400 });
    }

    if(!params.storeId){
      return new NextResponse("No data to update is given", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    })

    return new NextResponse(JSON.stringify(store), { status: 200});
  } catch (error: any) {
    console.log('[UPDATE STORE ERROR]', error)
    return new NextResponse('updating store internal Error', {status: 500})
  }
};


export const DELETE = async (req: Request, {params}: any) => {
  try {
    const { userId } = auth();
    if (!userId){
      return new NextResponse("Unauthorize request", { status: 401 });
    }
    if(!params.storeId){
      return new NextResponse("No data to update is given", { status: 400 });
    }

    
    const store = await prismadb.store.delete({
      where: {
        id: params.storeId,
        userId
      }
    })
    
    return new NextResponse(JSON.stringify(store), { status: 200});
  } catch (error: any) {
    console.log('[DELETE STORE ERROR]', error)
    return new NextResponse(error.message, {status: 500})
  }
};



export const GET = async (req: Request, {params}: any) =>  {
  try {
    const {userId} = auth()

    if(!userId) {
      return new NextResponse("Unauthorize request", {status: 401})
    }

    const stores = await prismadb.store.findMany({
      where: {
        userId,
        id: params.storeId
      }
    })

    return new NextResponse(JSON.stringify(stores), {status: 201})

  } catch (error: any) {
    console.log('[CREATE STORE ERROR]', error)
    return new NextResponse(error.message, {status: 500})
  }
}
