import { useParams } from "next/navigation";

import useOrigin from "@/utils/use-origin";
import ClipBoard from "./ClipBoard";

interface APIListProps {
  entityName: string;
  entityId: string;
  title: string;
}

function APIList({ entityName, entityId, title }: APIListProps) {
  const params = useParams();
  const origin = useOrigin();

  const mainLink = `${origin}/api/${params.storeId}/${entityName}`;
  return (
    <>
      <ClipBoard title={`GET ${title}s`} url={mainLink} status="Public" />

      <ClipBoard
        title={`GET ${title}`}
        url={`${mainLink}/{${entityId}}`}
        status="Public"
      />

      <ClipBoard title={`CREATE ${title}s`} url={`${mainLink}`} status="Admin" />

      <ClipBoard
       title={`PATCH ${title}`}
        url={`${mainLink}/{${entityId}}`}
        status="Admin"
      />
      <ClipBoard
        title={`DELETE ${title}`}
        url={`${mainLink}/{${entityId}}`}
        status="Admin"
      />
    </>
  );
}

export default APIList;
