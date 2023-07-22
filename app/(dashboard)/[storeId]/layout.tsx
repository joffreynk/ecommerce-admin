import { auth } from "@clerk/nextjs"
import React from "react"
import {redirect}  from 'next/navigation'
import prismadb from "@/utils/prismadb";
import { log } from "console";

export default async function NavBar({children, params}: {children: React.ReactNode, params: {storeId: any}}) {
  const {userId} = auth();

  if(!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({where: {userId, id: params.storeId}})


  if(!store) redirect('/')

  return (
    <>
      <h4>This will be nav bar</h4>
      {
        children
      }
    </>
  )
}
