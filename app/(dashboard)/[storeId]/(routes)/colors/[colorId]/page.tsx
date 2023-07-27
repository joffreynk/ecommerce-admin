import SizePageForm from "@/components/uiComponents/size/SizePageForm";
import prismadb from "@/utils/prismadb";

const Size = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizePageForm initialData={size} />
      </div>
    </div>
  );
};

export default Size;
