import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import prismadb from "@/utils/prismadb";

export const getUserId = ()=>{
  const {userId} = auth()
  if(!userId) redirect('/sign-in')
  return userId
}

export const getStore = async (storeId?: "")=>{
  
  const store = await prismadb.store.findFirst({where: {userId: getUserId(), id : storeId}})

  return store
}
