import { UserButton, auth } from "@clerk/nextjs"
import MainNav from "@/components/reusableComponents/mainNav"
import StoreSwitcher from "@/components/ui/storeSwitcher"
import { redirect } from "next/navigation"
import prismadb from "@/utils/prismadb"


export default async function NavBarComponent() {
  const {userId} = auth()
  if(!userId){
    redirect('/sign-in')
  }

  const stores = await prismadb.store.findMany({
    where: {userId},
  })
  return (
    <div className="border-b border-gray-50">
      <div className="flex h-16 items-center px-4 ">
        <StoreSwitcher items={stores}  />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      
    </div>
  )
}
