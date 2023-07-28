import ProductPageForm from "@/components/uiComponents/product/ProductPageForm";
import prismadb from "@/utils/prismadb";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    }
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductPageForm initialData = {product} />
      </div>
    </div>
  );
};

export default ProductPage;
