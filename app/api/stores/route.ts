import prismadb from "@/utils/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const POST = async(req: Request,) => {
  try {
    const {userId} = auth()
    const {name} = await req.json()

    if(!userId) {
      return new NextResponse("Unauthorize request", {status: 401})
    }

    if(!name) {
      return new NextResponse("store name must be provided", {status: 400})
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    })

    return new NextResponse(JSON.stringify(store), {status: 201})

  } catch (error: any) {
    console.log('[CREATE STORE ERROR]', error)
    return new NextResponse(error.message, {status: 500})
  }
}

