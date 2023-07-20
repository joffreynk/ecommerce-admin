import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex  items-center mt-auto h-full w-full justify-center '>
      {children}
    </div>
  )
}

export default Layout
