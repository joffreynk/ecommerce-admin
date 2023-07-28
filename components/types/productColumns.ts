export interface ProductProps {
  id: string;
  name: string;
  price: string;
  category:string;
  color: string;
  size: string;
  isArchived: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface ProductTableRowProps {
  accessor: string;
  header: string;
}

export const productTableRow = [
  {
    accessor: "id",
    header: "#",
  },
  {
    accessor: "name",
    header: "Name",
  },
  {
    accessor: "price",
    header: "Price",
  },
  {
    accessor: "category",
    header: "Category",
  },
  {
    accessor: "size",
    header: "Size",
  },
  {
    accessor: "color",
    header: "Color",
  },
  {
    accessor: "isFeatured",
    header: "Featured",
  },
  {
    accessor: "isArchived",
    header: "Archived",
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
