import BillBoardPageForm from "@/components/uiComponents/billboard/BillBoardPageForm";
import prismadb from "@/utils/prismadb";

const BillBoard = async ({ params }: { params: { billboardId: string } }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardPageForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillBoard;
