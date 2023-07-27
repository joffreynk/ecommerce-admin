import { getStore } from '@/utils/protectuser'
import React from 'react'

const Dashboard = async({params}: any) => {
  const store = await getStore(params.storeId)
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>active store: {store?.name}  </h2>
    </div>
  )
}

export default Dashboard
