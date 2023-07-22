import prismadb from "@/utils/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

export default async function SetUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {userId} = auth()
  if(!userId) redirect('/')

  const store = await prismadb.store.findFirst({where: {userId}})
  if(store) redirect(`/${store.id}`)
  return <>{children}</>
}
