import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { TotalCasesType, apiConstants } from "../../../constant/constant";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";

function TotalCase() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<TotalCasesType | null | any>(null);

  const [loading, setLoading] = useState(true);
  const columns = [
    {
      id: "1",
      name: "Lawyer Name",
      fieldName: "lawyer",
      style: {
        width: "10%",
      },
    },
    {
      id: "2",
      name: "Case Title",
      fieldName: "title",
      style: {
        width: "10%",
      },
    },
    {
      id: "3",
      name: "Description",
      fieldName: "description",
      style: {
        width: "40%",
      },
    },
    {
      id: "4",
      name: "Action Required",
      fieldName: "orders",
      style: {
        width: "40%",
      },
    },
    {
      id: "5",
      name: "Action",
      style: {
        width: "10%",
      },
    },
  ];
  useEffect(() => {
    getDetails({
      pageNumber: 1,
      search: "",
    });
  }, []);

  const getDetails = async (data: any) => {
    const details = {
      search: data.search,
      startIndex: data.pageNumber,
    };
    await axios
      .get(apiConstants.baseUrl + apiConstants.getCases(details))
      .then((response) => {
        setCases(response);
        setLoading(false);
      });
  };

  const onActionClick = (data: any) => {
    navigate(`view-case/${data._id}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={cases}
          columns={columns}
          onActionClick={onActionClick}
          onPageChange={(pageNumber: number) =>
            getDetails({ search: "", pageNumber: pageNumber })
          }
          onSearchChange={(value: string) =>
            getDetails({ search: value, pageNumber: cases.startIndex })
          }
        />
      </div>
    </section>
  );
}

export default TotalCase;
