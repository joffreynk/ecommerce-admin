import Heading from "@/components/uiComponents/Heading";
import { Order, OrderTableRow } from "@/components/types/OrdersColumns";
import OrderDataTable from "./OrderDataTable";

const OrderClient = ({ data }: { data: Order[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Look at yor clients orders in the curent store"
      />
      <OrderDataTable headers={OrderTableRow} data={data} />
    </>
  );
};

export default OrderClient;
