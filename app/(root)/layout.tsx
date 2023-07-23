import { getStore } from "@/utils/protectuser";
import { redirect } from "next/navigation";

export default async function SetUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const store = await getStore()

  if(store) redirect(`/${store.id}`)
  return <>{children}</>
}
