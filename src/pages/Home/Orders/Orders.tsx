import { useNavigate } from "react-router-dom";
import TableSection from "../../../component/Table/Table";

function Orders() {
  const navigate = useNavigate();
  const exampleData = [
    { id: 1, Merchnat: "John", Product: "test", points: 10 },
    { id: 2, Merchnat: "Jane", Product: "test", points: 10 },
    { id: 3, Merchnat: "Doe", Product: "test", points: 10 },
    { id: 4, Merchnat: "Jane", Product: "test", points: 10 },
    { id: 5, Merchnat: "Doe", Product: "test", points: 10 },
    { id: 6, Merchnat: "John", Product: "test", points: 20 },
    { id: 7, Merchnat: "Jane", Product: "test", points: 20 },
    { id: 8, Merchnat: "Doe", Product: "test", points: 20 },
    { id: 9, Merchnat: "Jane", Product: "test", points: 20 },
    { id: 10, Merchnat: "Doe", Product: "test", points: 20 },
  ];

  return <TableSection data={exampleData} itemsPerPage={5} />;
}

export default Orders;
