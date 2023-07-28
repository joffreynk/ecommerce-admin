"use client";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/uiComponents/Heading";
import APIList from "../APIList";
import ProductDataTable from "./ProductDataTable";
import { ProductProps, productTableRow } from "@/components/types/productColumns";

const ProductClient = ({data}: {data: ProductProps[]}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`BillBoards (${data.length})`}
          description="Maanage your billboards"
        />
        <button
          type="button"
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          className="bg-slate-700 p-2 rounded-md flex items-center justify-center text-white pr-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <span>Add new</span>
        </button>
      </div>

      <div className="h-[2px] my-6 w-full bg-slate-200" />

      <ProductDataTable headers={productTableRow} data={data}  />

      <div className="h-[2px] my-6 w-full bg-slate-200" />
    <Heading
    title="API List "
    description="Possible API list for billboards"
     />

     <APIList title="BillBoard" entityId="billboardId" entityName="billboards" />
    </>
  );
};

export default ProductClient;
