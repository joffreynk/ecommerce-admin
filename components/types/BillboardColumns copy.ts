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
    accessor: "name",
    header: "Name",
  },
  {
    accessor: "value",
    header: "Value",
  },
  {
    accessor: "createdAt",
    header: "Created At",
  },
  {
    accessor: "manage",
    header: "Manage",
  },
];
