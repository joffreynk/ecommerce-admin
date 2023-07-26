import Image from "next/image";
import { BillBoard, billBoardTableRowProps } from "../types/BillboardColumns";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const DataTable = ({headers, billboards}: {headers: billBoardTableRowProps[], billboards:BillBoard[] }) => {

  const router = useRouter();
  const params = useParams();
  const [query, setQuery] = useState('')



  return (
    <div className="flex flex-col">
      <div className="my-10 flex items-center gap-3">
      <p className="text-lg underline">Search: </p>
      <input type="text" name="query" id="query" onChange={(e)=>setQuery(e.target.value)} placeholder="search Billboard....." className=" w-6/12 outline-none justify-self-center  p-3 rounded-md border" />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light border rounded-xl">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                  {
                    headers.map(header=>(
                      <th key={header.accessor} scope="col" className="px-6 py-4">
                        {header.header}
                      </th>
                    ))
                   }
                  </tr>
                </thead>
                <tbody>
                   {
                    billboards.map((billboard, i)=>(
                      <tr key={billboard.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {i+1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{billboard.label}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Image src={billboard.imgUrl} alt="billboard" height={150} width={150} />
                      </td >
                      <td className="whitespace-nowrap px-6 py-4">
                        <button type="button" className="bg-slate-500 p-2 rounded-md text-lg text-white hover:bg-teal-600" onClick={() => router.push(`/${params.storeId}/billboards/${billboard.id}`)}>
                          view More
                        </button>
                      </td>
                    </tr>
                    ))
                   }
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
