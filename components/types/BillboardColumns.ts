export interface BillBoard {
  id: string;
  label: string;
  imgUrl: string;
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
  {
    accessor: "manage",
    header: "Manage",
  },
];
