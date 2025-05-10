import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { TotalCasesType, apiConstants } from "../../../constant/constant";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import { busnessOwenerMock, HASH_TAG_MOCK } from "../../../constant/mock";

function HashtagList() {
  const navigate = useNavigate();
  // const [cases, setCases] = useState<TotalCasesType | null | any>(null);

  const [loading, setLoading] = useState(false);
  const columns = [
    {
      id: "1",
      name: "Id",
      fieldName: "id",
      style: {
        width: "15%",
      },
    },
    {
      id: "2",
      name: "Name",
      fieldName: "name",
      style: {
        width: "25%",
      },
    },
    {
      id: "3",
      name: "Total Post",
      fieldName: "total_post",
      style: {
        width: "25%",
      },
    },
    {
      id: "4",
      name: "Status",
      fieldName: "status",
      style: {
        width: "40%",
      },
    },
    {
      id: "5",
      name: "Action",
      style: {
        width: "20%",
      },
    },
  ];
  // useEffect(() => {
  //   getDetails({
  //     pageNumber: 1,
  //     search: "",
  //   });
  // }, []);

  // const getDetails = async (data: any) => {
  //   const details = {
  //     search: data.search,
  //     startIndex: data.pageNumber,
  //   };
  //   await axios
  //     .get(apiConstants.baseUrl + apiConstants.getCases(details))
  //     .then((response) => {
  //       setCases(response);
  //       setLoading(false);
  //     });
  // };

  const onActionClick = (data: any) => {
    navigate(`${data.id}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={HASH_TAG_MOCK}
          columns={columns}
          onActionClick={onActionClick}
          // onPageChange={(pageNumber: number) =>
          //   getDetails({ search: "", pageNumber: pageNumber })
          // }
          // onSearchChange={(value: string) =>
          //   getDetails({ search: value, pageNumber: cases.startIndex })
          // }
        />
      </div>
    </section>
  );
}

export default HashtagList;
