import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import CreateHashPopup from "../../../component/CreateHashPopup";

interface HashtagListType {
  data: {
    id: string;
    created_at: string;
    name: string;
    post_count: number;
    status: string;
  }[];
  totalItems: number;
  itemsPerPage: number;
  totalPage: number;
  pageNumber: number
}

function HashtagList() {
  const navigate = useNavigate();
  const [hashtagList, setHashtagList] = useState<HashtagListType | null | any>(null);
  const [showPopup, setShowpopup] = useState(false)
  const [loading, setLoading] = useState(true);
  const columns = [
    // {
    //   id: "1",
    //   name: "Id",
    //   fieldName: "id",
    //   style: {
    //     width: "15%",
    //   },
    // },
    {
      id: "6",
      name: "Date",
      fieldName: "created_at",
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
      fieldName: "post_count",
      style: {
        width: "15%",
      },
    },
    {
      id: "4",
      name: "Status",
      fieldName: "status",
      style: {
        width: "35%",
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
  useEffect(() => {
    getDetails({
      page: 1,
      search: "",
    });
  }, []);

  const getDetails = async (data: any) => {
    const details = {
      search: data.search,
      page: data.page,
    };
    await axios
      .get(apiConstants.baseUrl + apiConstants.getHashtagList(details))
      .then((response) => {
        console.log(response.data)
        const { data } = response
        if (data) {
          const details = {
            pageNumber: data.page,
            totalItems: data.total,
            itemsPerPage: data.limit,
            totalPage: data.total_pages,
            data: data.data,
          }
          setHashtagList(details);
        }
        setLoading(false);
      });
  };

  const onActionClick = (data: any) => {
    navigate(`${data.id}`);
  };

  const onCreateHashClick = () => {
    setShowpopup(true)
  }

  const onEditAction = (data: any) => {
    navigate(`${data.id}`);
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <section className="card">
        <div className="card-body">
          <TableSection
            data={hashtagList}
            columns={columns}
            onActionClick={onActionClick}
            showCustomButton={true}
            onCustomButtonClick={onCreateHashClick}
            customButtonName={'Create Hashtag'}
            onEditAction={onEditAction}
            onPageChange={(pageNumber: number) =>
              getDetails({ search: "", page: pageNumber })
            }
            onSearchChange={(value: string) =>
              getDetails({ search: value, page: 1 })
            }
          />
        </div>
      </section>
      {showPopup && (
        <CreateHashPopup
          closeModal={() => setShowpopup(false)}
          onCreated={() => getDetails({ search: '', pageNumber: 1 })}
        />
      )}
    </>
  );
}

export default HashtagList;
