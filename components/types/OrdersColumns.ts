export interface Order {
  id: string;
  phone: string;
  totalPrice: string;
  isPaid: boolean;
  products: {
    name: string;
    quantity: number;
  };
  address: string;
  createdAt: string;
}

export interface OrderTableRowProps {
  accessor: string;
  header: string;
}

export const OrderTableRow = [
  {
    accessor: "id",
    header: "#",
  },
  {
    accessor: "name",
    header: "Name",
  },
  {
    accessor: "totalPrice",
    header: "Total Price",
  },
  {
    accessor: "products",
    header: "Order Items",
  },
  {
    accessor: "is paid",
    header: "Paid",
  },
  {
    accessor: "address",
    header: "Address",
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
