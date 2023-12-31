export interface BillBoard {
  id: string;
  label: string;
  imgUrl: string;
  createdAt: string;
}

export interface billBoardTableRowProps {
  accessor: string;
  header: string;
}

export const billBoardTableRow = [
  {
    accessor: "id",
    header: "#",
  },
  {
    accessor: "label",
    header: "Label",
  },
  {
    accessor: "imgUrl",
    header: "Image",
  },
  ,
  {
    accessor: "createdAt",
    header: "Created At",
  },
  {
    accessor: "manage",
    header: "Manage",
  },
];
