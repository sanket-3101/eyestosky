import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { TotalCasesType, apiConstants } from "../../../constant/constant";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import { PostListMock, busnessOwenerMock } from "../../../constant/mock";
import FilterPopup from "../../../component/FilterPopup";

function PostList() {
  const navigate = useNavigate();
  // const [cases, setCases] = useState<TotalCasesType | null | any>(null);

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowpopup] = useState(false)
  const columns = [
    {
      id: "1",
      name: "Date",
      fieldName: "date",
      style: {
        width: "20%",
      },
    },
    {
      id: "2",
      name: "Post-Type",
      fieldName: "post_type",
      style: {
        width: "20%",
      },
    },
    {
      id: "3",
      name: "Post-Link",
      fieldName: "post_link",
      style: {
        width: "30%",
      },
    },
    {
      id: "4",
      name: "Status",
      fieldName: "status",
      style: {
        width: "20%",
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
    navigate(`view/${data.id}`);
  };

  const onEditAction = (data: any) => {
    navigate(`edit/${data.id}`);
  }

  const onCustomButtonClick = () => {
    setShowpopup(true)
  }

  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={PostListMock}
          columns={columns}
          onActionClick={onActionClick}
          onEditAction={onEditAction}
          onCustomButtonClick={onCustomButtonClick}
          customButtonName={'Add Filter'}
          showCustomButton={true}
        // onPageChange={(pageNumber: number) =>
        //   getDetails({ search: "", pageNumber: pageNumber })
        // }
        // onSearchChange={(value: string) =>
        //   getDetails({ search: value, pageNumber: cases.startIndex })
        // }
        />
      </div>
      {showPopup && (
        <FilterPopup
          closeModal={() => setShowpopup(false)}
        />
      )}
    </section>
  );
}

export default PostList;
