import OrderClient from "@/components/uiComponents/order/OrderClient";
import { formatter } from "@/utils/currencyFormatter";
import prismadb from "@/utils/prismadb";
import { format } from "date-fns";

export default async function Orders({params}: {params: {storeId: string}}) {
  const orders = await prismadb.order.findMany({
    where: {storeId: params.storeId},
    include: {
      orderItems: {
        include: {
          product: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedOrders = orders.map((item: any)=>({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems.map((orderItem: any)=>({name: orderItem.product.name, quantity: orderItem.quantity})),
    totalPrice: formatter.format(item.orderItems.reduce((total: any, item: any)=>(total+(Number(item.product.price)* Number(item.quantity))),0)),
    createdAt: format(item.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders}  />
      </div>
    </div>
  );
}


