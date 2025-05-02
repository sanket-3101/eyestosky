import { useEffect, useState } from "react";
import axios from "../../../constant/axios";
import { DisputeRequestType, apiConstants } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import { useNavigate } from "react-router-dom";
import { showNotificationMark } from "../../../redux/slice/Auth";
import { useDispatch } from "react-redux";
function Notification() {
  const [details, setDetails] = useState<DisputeRequestType | null | any>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const columns = [
    {
      id: "1",
      name: "Title",
      fieldName: "title",
    },
    {
      id: "2",
      name: "Description",
      fieldName: "description",
    },
    {
      id: "3",
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
    dispatch(showNotificationMark(false))
  }, []);

  const getDetails = async (data: any) => {
    const details = {
      search: data.search,
      startIndex: data.pageNumber,
    };
    await axios.get(apiConstants.getNotification(details)).then((response) => {
      setDetails(response);
      setLoading(false);
    });
  };

  const onActionClick = (data : any) => {
    if(data._case) {
      navigate(`/total-case/view-case/${data._case}`);
    }else {
      alert('Action will only work for case notification')
    }
  }
  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={details}
          columns={columns}
          onPageChange={(pageNumber: number) =>
            getDetails({ search: "", pageNumber: pageNumber })
          }
          onSearchChange={(value: string) =>
            getDetails({ search: value, pageNumber: details.startIndex })
          }
          onActionClick={(rowData : any) => onActionClick(rowData)}
        />
      </div>
    </section>
  );
}

export default Notification;
