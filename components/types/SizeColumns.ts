export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface SizeTableRowProps {
  accessor: string;
  header: string;
}

export const sizeTableRow = [
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
