import { UserButton } from "@clerk/nextjs"
import MainNav from "@/components/reusableComponents/mainNav"


function NavBarComponent() {
  return (
    <div className="border-b border-gray-50">
      <div className="flex h-16 items-center px-4">
        <div>
          this will be the store switcher 
        </div>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      
    </div>
  )
}

export default NavBarComponent
