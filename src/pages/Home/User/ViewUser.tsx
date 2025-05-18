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
function ViewUser() {
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


  const getFormattedText = (text: string, maxLength: number, reverse: boolean) => {
    // if (!text) return
    // if (text.length < 1) return
    // if (text.length < maxLength) return text
    // return <TextWithViewMore text={text} maxLength={maxLength} reverse={reverse} />;
  };

  return false ? (
    <Loader />
  ) : true ? (
    <>
      {/* start: page */}
      <section className="card">
        <div className="card-body">
          <form action="" method="post">
            <div className="row mb-3">
              <div className="form-group col-sm-6">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Name
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'Test'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Gender
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'male'}
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
                      Email Address
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'Test@gmail.com'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Country
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'India'}
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
                      UFO Witinessed
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={'Yes'}
                      disabled={action === TableAction.view}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Description
                    </label>
                  </div>
                  {
                    action === TableAction.edit ? (
                      <div className="col-md-8">
                        <textarea
                          name=" Assigned Client"
                          className="form-control"
                          value={'Description'}
                          rows={4}
                          cols={50}
                        />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <input
                          defaultValue="Description"
                          className="btn btn-primary w-50"
                          onClick={(e) =>
                            setPopupDetails({
                              show: true,
                              text: 'Description',
                            })
                          }
                        />
                      </div>
                    )
                  }

                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-sm-12 pt-0">
                <div className="row">
                  <div className="col-md-2">
                    <label htmlFor="" className="mb-0">
                      Profile Picture
                    </label>
                  </div>
                  <div className="col-md-10">
                    <div
                      // className="thumb-info"
                      style={{ display: "flex", justifyContent: "center", height: '150px', width: '150px' }}
                      // onClick={() => document.getElementById("fileInput")?.click()}
                      id="uploadButton"
                    >
                      <img
                        src={"https://avatar.iran.liara.run/public/boy?username=Ash"}
                        className="rounded img-fluid"
                        alt="Select Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="sub-title mb-1" id="order-section">
            <h5 className="font-weight-bold">Post History</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-responsive-md table-bordered common-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "8%" }}>Post Type</th>
                  <th style={{ width: "15%" }}>Post Link</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "15%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: new Date(),
                    post_type: 'Imange',
                    post_link: "abc.com",
                    status: "Active"
                  }
                ].map((item: any, index: number) => (
                  <tr>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.post_type}</td>
                    <td>{item.post_link}</td>
                    <td>{item.status}</td>
                    {/* <td>{getFormattedText(item.summary, 30, false)}</td> */}
                    {/* <td>{getFormattedText(item.actionRequired, 50, true)}</td> */}
                    <td>
                      <a>
                        {/* <i className="bx bxs-trash-alt text-6 text-primary cur-pointer mr-5" /> */}
                        <i className='bx bxs-edit-alt text-6 text-primary cur-pointer' />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {
            action != TableAction.view && (
              <>
                <input
                  defaultValue="Update"
                  className="btn btn-primary w-30 mt-5"
                  style={{ marginRight: '5px' }}
                />
                <input
                  defaultValue="Delete"
                  className="btn btn-primary w-30 mt-5"
                />
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

export default ViewUser;
