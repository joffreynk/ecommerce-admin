"use client";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/uiComponents/Heading";
import DataTable from "./DataTable";
import { billboard } from "@prisma/client";
import { useEffect, useState } from "react";

const BillBoardClient = () => {
  const router = useRouter();
  const params = useParams();
  const [isMounted, setisMounted] = useState(false)
  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/${params.storeId}/billboards`, fetcher);


  useEffect(()=>{
    setisMounted(true);
  }, [])

  if(!isMounted) return null;


  const billboards = data?.length && data.map((billboard: billboard)=>({label: billboard.label, id: billboard.id, createdAt: billboard.createdAt, imgUrl: billboard.imgUrl}));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Bill Boards (0)"
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

      <DataTable />
    </>
  );
};

export default BillBoardClient;
