import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { TotalCasesType, apiConstants } from "../../../constant/constant";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";

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
      name: "Name",
      fieldName: "first_name",
      style: {
        width: "15%",
      },
    },
    {
      id: "2",
      name: "Last-Name",
      fieldName: "last_name",
      style: {
        width: "25%",
      },
    },
    {
      id: "3",
      name: "Email",
      fieldName: "email",
      style: {
        width: "20%",
      },
    },
    {
      id: "4",
      name: "Description",
      fieldName: "description",
      style: {
        width: "30%",
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
      pageNumber: 1,
      search: "",
    });
  }, []);

  const getDetails = async (data: any) => {
    const details = {
      search: data.search,
      page: data.pageNumber,
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
            totalPage: 1,
            data: data.users,
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

export default UserList;
