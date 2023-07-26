import { useParams } from "next/navigation";

import useOrigin from "@/utils/use-origin";
import ClipBoard from "./ClipBoard";

interface APIListProps {
  entityName: string;
  entityId: string;
}

function APIList({ entityName, entityId }: APIListProps) {
  const params = useParams();
  const origin = useOrigin();

  const mainLink = `${origin}/api/${params.storeId}/${entityName}`;
  return (
    <>
      <ClipBoard title="GET BillBoards" url={mainLink} status="Public" />

      <ClipBoard
        title="GET BillBoard"
        url={`${mainLink}/{${entityId}}`}
        status="Public"
      />

      <ClipBoard title="POST BillBoards" url={`${mainLink}`} status="Admin" />
      <ClipBoard
        title="PATCH BillBoard"
        url={`${mainLink}/{${entityId}}`}
        status="Admin"
      />

      <ClipBoard
        title="PATCH BillBoard"
        url={`${mainLink}/{${entityId}}`}
        status="Admin"
      />
      <ClipBoard
        title="DELETE BillBoard"
        url={`${mainLink}/{${entityId}}`}
        status="Admin"
      />
    </>
  );
}

export default APIList;
