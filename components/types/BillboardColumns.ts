export interface BillBoard {
  id: string;
  label: string;
  imgURl: string;
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
    header: "Image URL",
  },
  {
    accessor: "manage",
    header: "Manage",
  },
];
