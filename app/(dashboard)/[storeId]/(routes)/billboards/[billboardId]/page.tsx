import prismadb from '@/utils/prismadb'
import React from 'react'

const BillBoard = async({params}: {params:{billboardId: string}}) => {

  const billboards = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })
  return (
    <div>
      BillBoard
    </div>
  )
}

export default BillBoard
