import { format } from "date-fns";

import SizeClient from "@/components/uiComponents/size/SizeClient";
import prismadb from "@/utils/prismadb";
import { size } from "@prisma/client";

export default async function SizeS({params}: {params: {storeId: string}}) {
  const sizes = await prismadb.size.findMany({
    where: {storeId: params.storeId},
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedSizes = sizes.map((size: size)=>({id: size.id, name: size.name, value: size.value, createdAt: format(size.createdAt, 'MMM dd, yyyy')}));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formattedSizes}  />
      </div>
    </div>
  );
}


