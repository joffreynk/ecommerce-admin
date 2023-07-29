"use client";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/uiComponents/Heading";
import APIList from "../APIList";
import BillBoardDataTable from "./OrderDataTable";
import { Order, OrderTableRow } from "@/components/types/OrdersColumns";

const OrderClient = ({data}: {data: Order[]}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
    <BillBoardDataTable headers={OrderTableRow} data={data}  />
      <div className="h-[2px] my-6 w-full bg-slate-200" />
    <Heading
    title="API List "
    description="Possible API list for billboards"
     />

     <APIList title="BillBoard" entityId="billboardId" entityName="billboards" />
    </>
  );
};

export default OrderClient;
