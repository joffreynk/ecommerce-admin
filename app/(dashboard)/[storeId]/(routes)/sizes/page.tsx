import { BillBoard } from "@/components/types/BillboardColumns";
import BillBoardClient from "@/components/uiComponents/billboard/billBoardClient";
import prismadb from "@/utils/prismadb";

export default async function SizeS({params}: {params: {storeId: string}}) {
  const billboards = await prismadb.billboard.findMany({
    where: {storeId: params.storeId},
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedBillboards = billboards.map((billboard: BillBoard)=>({label: billboard.label, id: billboard.id, imgUrl: billboard.imgUrl}));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient formattedBillboards={formattedBillboards}  />
      </div>
    </div>
  );
}


