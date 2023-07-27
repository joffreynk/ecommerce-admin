export interface Color {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface ColorTableRowProps {
  accessor: string;
  header: string;
}

export const colorTableRow = [
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
