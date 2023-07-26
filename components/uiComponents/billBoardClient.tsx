"use client";

import Heading from "@/components/uiComponents/Heading";
import { useParams, useRouter } from "next/navigation";
import DataTable from "./DataTable";

const BillBoardClient = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Bill Boards (0)"
          description="Maanage your billboards"
        />
        <button
          type="button"
            onClick={() =>router.push(`/${params.storeId}/billboards/new`)}
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
