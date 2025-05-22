import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, showToast } from "../../../constant/util";
import axios from "../../../constant/axios";
import { Loader } from "../../../component/Loader";
import { apiConstants, TableAction } from "../../../constant/constant";
import TextWithViewMore from "../../../component/TextWithViewMore";
import Popup from "../../../component/Popup";
import { useAppSelector } from "../../../redux/reduxHook";
import moment from "moment";
function PostView() {
  const navigate = useNavigate();
  const profileDetails = useAppSelector((state) => state.auth.profileDetails);
  const { id, action } = useParams();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any>([]);
  const [popup_details, setPopupDetails] = useState<{
    show: boolean;
    text: string;
  }>({
    show: false,
    text: "",
  });
  useEffect(() => {
    // if (!id) {
    //   showToast("Invalid id", {
    //     type: "error",
    //   });
    //   navigate("total-case");
    //   return;
    // } else {
    //   getDetails(id);
    //   getService();
    // }
  }, [id]);

  const getDetails = async (id: string) => {
    // await axios.get(apiConstants.getCaseDetails + id).then((response) => {
    //   setDetails(response.data);
    //   setLoading(false);
    // });
  };

  const getService = async () => {
    // await axios
    //   .get(apiConstants.getService)
    //   .then((response) => {
    //     setService(response.data);
    //   })
    //   .catch(() => {
    //     showToast("Failed to get Services", {
    //       type: "error",
    //     });
    //   });
  };


  return false ? (
    <Loader />
  ) : true ? (
    <>
      {/* start: page */}
      <section className="card">
        <div className="card-body">
          <form method="post">
            <div className="row mb-3">
              <div className="form-group col-sm-6">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Post Date
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'22-01-2025'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Post Type
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'Image'}
                      disabled={action === TableAction.view}
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
                      Post Link
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'https://test.com'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Status
                    </label>
                  </div>
                  <div className="col-md-8">
                    <select
                      className="d-block form-control"
                      disabled={action === TableAction.view}
                      // style={{ width: "4.5rem" }}
                      value={'1'}
                    // onChange={(e) => {
                    //   handleChange({
                    //     name: {
                    //       ...userDetails.name,
                    //       salutation: e.target.value,
                    //     },
                    //   });
                    // }}
                    >
                      <option value="1">Approved</option>
                      <option value="2">Rejected</option>
                      <option value="3">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-sm-6">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Latitude
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'542342'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Longitude
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'242234'}
                      disabled={action === TableAction.view}
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
                      Caption
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'https://test.com'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row mb-3">
              <div className="form-group col-sm-12 pt-0">
                <div className="row">
                  <div className="col-md-2">
                    <label htmlFor="" className="mb-0">
                      Description
                    </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      defaultValue="Show Description"
                      className="btn btn-primary"
                      style={{
                        minWidth: '3rem'
                      }}
                      onClick={(e) =>
                        setPopupDetails({
                          show: true,
                          text: details.description,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </form>
          {
            action != TableAction.view && (
              <>
                <input
                  defaultValue="Update"
                  className="btn btn-primary w-30"
                  style={{ marginRight: '5px' }}
                />
                {/* <input
                  defaultValue="Delete"
                  className="btn btn-primary w-30 mt-5"
                /> */}
              </>
            )
          }
        </div>
      </section>


      {/* end: page */}
      {popup_details.show && (
        <Popup
          description={popup_details.text}
          closeModal={() => setPopupDetails({ text: "", show: false })}
        />
      )}
    </>
  ) : null;
}

export default PostView;
