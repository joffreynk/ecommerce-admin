import BillBoardClient from "@/components/uiComponents/billBoardClient";
import React from "react";


function Billboards() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient />
      </div>
    </div>
  );
}

export default Billboards;
