import {  useState } from "react";

import { DisputeRequestType } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CMS_PAGES_MOCK } from "../../../constant/mock";
function Cmspage() {
  const [details, setDetails] = useState<DisputeRequestType | null | any>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const columns = [
    {
      id: "1",
      name: "Title",
      fieldName: "title",
    },
    {
      id: "3",
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
  //   dispatch(showNotificationMark(false))
  // }, []);

  // const getDetails = async (data: any) => {
  //   const details = {
  //     search: data.search,
  //     startIndex: data.pageNumber,
  //   };
  //   await axios.get(apiConstants.getNotification(details)).then((response) => {
  //     setDetails(response);
  //     setLoading(false);
  //   });
  // };

  // const onActionClick = (data : any) => {
  //   if(data._case) {
  //     navigate(`/total-case/view-case/${data._case}`);
  //   }else {
  //     alert('Action will only work for case notification')
  //   }
  // }
  return false ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={CMS_PAGES_MOCK}
          columns={columns}
          onActionClick={() => {
            navigate('cms-editor');
          }}
        />
      </div>
    </section>
  );
}

export default Cmspage;
