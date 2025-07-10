import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { TotalCasesType, apiConstants } from "../../../constant/constant";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import Title from "../../../component/Title";

interface UserListType {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    description: string;
    status: string
  }[];
  totalItems: number;
  itemsPerPage: number;
  totalPage: number;
  pageNumber: number
}

function UserList() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserListType | null>(null);

  const [loading, setLoading] = useState(true);
  const columns = [
    {
      id: "1",
      name: "FirstName",
      fieldName: "first_name",
      style: {
        width: "15%",
      },
    },
    {
      id: "2",
      name: "LastName",
      fieldName: "last_name",
      style: {
        width: "15%",
      },
    },
    {
      id: "3",
      name: "Username",
      fieldName: "user_name",
      style: {
        width: "25%",
      },
    },
    // {
    //   id: "4",
    //   name: "Description",
    //   fieldName: "description",
    //   style: {
    //     width: "30%",
    //   },
    // },
    {
      id: "6",
      name: "Status",
      fieldName: "status",
      style: {
        width: "10%",
      },
    },
    {
      id: "5",
      name: "Action",
      style: {
        width: "30%",
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
    let details  = {
      search: data.search,
      page: data.page
    };
 
    await axios
      .get(apiConstants.baseUrl + apiConstants.getUserList(details))
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
          setUserList(details);
        }
        setLoading(false);
      });
  };

  const onActionClick = (data: any) => {
    navigate(`view/${data.id}`);
  };

  const onEditAction = (data: any) => {
    navigate(`edit/${data.id}`);
  }
  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={userList}
          columns={columns}
          onActionClick={onActionClick}
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
  );
}

export default UserList;
