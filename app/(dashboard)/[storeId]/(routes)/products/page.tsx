import ProductClient from "@/components/uiComponents/product/ProductClient";
import { formatter } from "@/utils/currencyFormatter";
import prismadb from "@/utils/prismadb";
import { format } from "date-fns";


export default async function Products({params}: {params: {storeId: string}}) {
  const products = await prismadb.product.findMany({
    where: {storeId: params.storeId},
    include: {
      color: true,
      category: true,
      size: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formatedProducts = products.map((item: any)=>({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    color: item.color.value,
    colorName: item.color.name,
    size: item.size.name,
    createdAt: format(item.createdAt, "MMM dd, yyyy")

  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatedProducts}  />
      </div>
    </div>
  );
}


