import { UserButton } from "@clerk/nextjs"

import MainNav from "@/components/uiComponents/mainNav"
import StoreSwitcher from "@/components/uiComponents/storeSwitcher"
import prismadb from "@/utils/prismadb"
import { getUserId } from "@/utils/protectuser"


export default async function NavBarComponent() {
  const userId = getUserId()

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
