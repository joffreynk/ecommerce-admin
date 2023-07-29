'use client'

import { useState } from "react";
import { OrderTableRowProps, Order } from "@/components/types/OrdersColumns";

const OrderDataTable = ({headers, data}: {headers: OrderTableRowProps[], data:Order[] }) => {
  const [query, setQuery] = useState('')

  const filteredItems = data
    // query === ""
    //   ? data
    //   : data.filter((item: BillBoard) =>
    //       item.name
    //         .toLowerCase()
    //         .replace(/\s+/g, "")
    //         .includes(query.toLowerCase().replace(/\s+/g, ""))
    //     );

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
                    filteredItems.map((item, i)=>(
                      <tr key={item.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {i+1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{item.products.map((product: {
                        name: string,
                        quantity: number,
                      })=>(
                        <ul key={product.name} className=" flex gap-1 items-center">
                          <li>{product.name}</li> {" : "}
                          <li >{product.quantity}</li>
                        </ul>
                      ))}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.totalPrice} </td >
                      <td className="whitespace-nowrap px-6 py-4">{item.isPaid} </td >
                      <td className="whitespace-nowrap px-6 py-4">{item.phone} </td >
                      <td className="whitespace-nowrap px-6 py-4">{item.address} </td >
                      <td className="whitespace-nowrap px-6 py-4">{item.createdAt}</td>
                      
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

export default OrderDataTable;
