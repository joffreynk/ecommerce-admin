import CategoryClient from "@/components/uiComponents/CategoryClient";
import prismadb from "@/utils/prismadb";


export default async  function Categories({params}: {params: {storeId: string}}) {
  const categories = await prismadb.category.findMany({
    where: {storeId: params.storeId},
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient />
      </div>
    </div>
  );
}
