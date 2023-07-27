import CategoryPageForm from "@/components/uiComponents/CategoryPageForm";
import prismadb from "@/utils/prismadb";

const Category = async ({ params }: { params: { categoryId: string, storeId: string } }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryPageForm billboards={billboards}  initialData={category} />
      </div>
    </div>
  );
};

export default Category;
