'use client'

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNav = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: `Settings`,
      active: pathname===`/${params.storeId}/settings`,
    }
  ]
  return (<nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
    {routes.map(route=>(
      <Link 
      key={route.href}
      href={route.href}
      className={`text-sm font-medium transition-colors hover:text-green-800 ${route.active? "text-black dark:text-white":"text-gray-600"}`}
      >
        {route.label}
      </Link>
    ))};
  </nav>);
};


export default MainNav