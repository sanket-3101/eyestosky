import { useEffect, useState } from "react";
import axios from "../../../constant/axios";
import { DisputeRequestType, apiConstants } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import { useNavigate } from "react-router-dom";
import { showNotificationMark } from "../../../redux/slice/Auth";
import { useDispatch } from "react-redux";
import { CMS_PAGES_MOCK } from "../../../constant/mock";
function Notification() {
  const [details, setDetails] = useState<DisputeRequestType | null | any>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      id: "1",
      name: "Title",
      fieldName: "title"
    },
    {
      id: "3",
      name: "Action",
      style: {
        width: "10%"
      }
    }
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
  return false
    ? <Loader />
    : <section className="card">
      <div className="card-body">
        <form method="post">
          <div className="row mb-3">
            <div className="form-group col-sm-6 pt-0">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="" className="mb-0">
                    Device
                  </label>
                </div>
                <div className="col-md-8">
                  <select
                    className="d-block form-control"
                    // style={{ width: "4.5rem" }}
                    value={"1"}
                  // onChange={(e) => {
                  //   handleChange({
                  //     name: {
                  //       ...userDetails.name,
                  //       salutation: e.target.value,
                  //     },
                  //   });
                  // }}
                  >
                    <option value="1">Android</option>
                    <option value="0">IOS</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="form-group col col-md-6 pt-0">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="" className="mb-0">
                    Title
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={''}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="form-group col-sm-6">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="" className="mb-0">
                    Message
                  </label>
                </div>
                <div className="col-md-8">
                  <textarea
                    name="Message"
                    className="form-control"
                    value={""}
                    rows={4}
                    cols={50}
                    placeholder="Enter Message"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <input
          defaultValue="Submit"
          className="btn btn-primary w-30 mt-5"
          style={{ marginRight: "5px" }}
        />
      </div>
    </section>;
}

export default Notification;
