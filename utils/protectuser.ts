import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import prismadb from "@/utils/prismadb";
import { NextResponse } from "next/server";

export const getUserId = ()=>{
  const {userId} = auth()
  if(!userId) redirect('/sign-in')
  return userId
}

export const getStore = async (storeId?: "")=>{
  const store = await prismadb.store.findFirst({where: {userId: getUserId(), id : storeId}})
  if(!store){
    redirect('/')
  }

  return store
}

export const getUserIdBackend = ()=>{
  const {userId} = auth()
  if(!userId) return new NextResponse("Unauthorize request", {status: 401});
  
  return userId
}