import prismadb from '@/utils/prismadb'
import React from 'react'

const Dashboard = async({params}: any) => {
  const store = await prismadb.store.findFirst({where:{id: params.storeId}})
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>active store: {store?.name}  </h2>
    </div>
  )
}

export default Dashboard
