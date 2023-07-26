export interface Category {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export interface CategoryTableRowProps {
  accessor: string;
  header: string;
}

export const CategoryTableRow = [
  {
    accessor: "id",
    header: "#",
  },
  {
    accessor: "name",
    header: "Name",
  },
  {
    accessor: "billboard",
    header: "Billboard",
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
