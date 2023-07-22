import { auth } from "@clerk/nextjs"
import React from "react"
import {redirect}  from 'next/navigation'
import prismadb from "@/utils/prismadb";

export default async function NavBar({children, params}: {children: React.ReactNode, params: {storeId: String}}) {
  const userId = auth();

  if(!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      id : params.storeId,
      userId
    }
  });

  if(!store) redirect('/')

  return (
    <>
      <h4>This will be av bar</h4>
      {
        children
      }
    </>
  )
}
