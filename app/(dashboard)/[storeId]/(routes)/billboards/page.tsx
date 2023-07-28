import BillBoardClient from "@/components/uiComponents/billboard/billBoardClient";
import prismadb from "@/utils/prismadb";
import { format } from "date-fns";

export default async function Billboards({params}: {params: {storeId: string}}) {
  const billboards = await prismadb.billboard.findMany({
    where: {storeId: params.storeId},
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedBillboards = billboards.map((billboard: any)=>({label: billboard.label,createdAt: format(billboard.createdAt, "MMM dd, yyyy")  ,id: billboard.id, imgUrl: billboard.imgUrl}));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient formattedBillboards={formattedBillboards}  />
      </div>
    </div>
  );
}


