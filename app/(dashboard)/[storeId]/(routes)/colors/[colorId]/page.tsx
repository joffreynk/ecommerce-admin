import ColorPageForm from "@/components/uiComponents/color/ColorPageForm";
import prismadb from "@/utils/prismadb";

const Color = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorPageForm initialData={color} />
      </div>
    </div>
  );
};

export default Color;
