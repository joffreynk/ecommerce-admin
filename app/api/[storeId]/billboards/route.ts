import prismadb from "@/utils/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const POST = async(req: Request, {params}: {params: {storeId: string}}) => {
  try {
    const {userId} = auth()
    const {label, imgUrl} = await req.json()

    if(!userId) {
      return new NextResponse("UnAuthenticated request", {status: 401})
    }

    if(!label.length) {
      return new NextResponse("Label name must be provided", {status: 400})
    }
    if(!imgUrl.length) {
        return new NextResponse("Image URL must be provided", {status: 400})
      }

      const storeByUserId = await prismadb.store.findFirst({
        where: {
          userId,
          id: params.storeId
        }
      })

      if(!storeByUserId) {
        return new NextResponse("UnAuthorized request", {status: 403})
      }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imgUrl,
        storeId: params.storeId
      }
    })



    return new NextResponse(JSON.stringify(billboard), {status: 201})

  } catch (error: any) {
    console.log('[CREATE BILLBOARDS ERROR]', error)
    return new NextResponse(error.message, {status: 500})
  }
}