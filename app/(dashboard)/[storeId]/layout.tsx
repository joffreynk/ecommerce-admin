import { auth } from "@clerk/nextjs"
import React from "react"
import {redirect}  from 'next/navigation'

import NavBarComponent from "@/components/uiComponents/navBarComponent";
import { getStore } from "@/utils/protectuser";

export default async function NavBar({children, params}: {children: React.ReactNode, params: {storeId: any}}) {

  const store = await getStore(params.storeId);

  if(!store) redirect('/')

  return (
    <>
      <NavBarComponent />
      {
        children
      }
    </>
  )
}
