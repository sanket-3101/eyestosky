import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, showToast } from "../../../constant/util";
import axios from "../../../constant/axios";
import { Loader } from "../../../component/Loader";
import { apiConstants } from "../../../constant/constant";
import TextWithViewMore from "../../../component/TextWithViewMore";
import Popup from "../../../component/Popup";
import { useAppSelector } from "../../../redux/reduxHook";
import moment from "moment";
function ViewCase() {
  const navigate = useNavigate();
  const profileDetails = useAppSelector((state) => state.auth.profileDetails);
  const { id } = useParams();
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
    if (!id) {
      showToast("Invalid id", {
        type: "error",
      });
      navigate("total-case");
      return;
    } else {
      getDetails(id);
      getService();
    }
  }, [id]);

  const getDetails = async (id: string) => {
    await axios.get(apiConstants.getCaseDetails + id).then((response) => {
      setDetails(response.data);
      setLoading(false);
    });
  };

  const getService = async () => {
    await axios
      .get(apiConstants.getService)
      .then((response) => {
        setService(response.data);
      })
      .catch(() => {
        showToast("Failed to get Services", {
          type: "error",
        });
      });
  };
  const handleServiceChange = (
    item: any,
    itemSelectedId: HTMLCollectionOf<HTMLOptionElement>
  ) => {
    const orders = details.orders.map((items: any) => {
      if (items._id === item._id) {
        return {
          ...items,
          serviceRequest: Array.from(itemSelectedId, (option) => option.value),
        };
      }
      return items;
    });
    setDetails({
      ...details,
      orders,
    });
  };

  const submitServiceChange = async (orderDetails: any) => {
    if (!orderDetails.serviceRequest) {
      showToast("Select Service Request is Request", {
        type: "error",
      });

      return;
    }
    const payload = {
      _case: id,
      _service: orderDetails.serviceRequest,
      description: details.description,
      _order: orderDetails._id,
    };

    await axios
      .post(apiConstants.submitServiceRequest, payload)
      .then((response) => {
        if (response) {
          showToast("Service request submitted successfully.", {
            type: "success",
          });
        }
      })
      .catch((err) => {
        showToast("Failed to Submit Request", {
          type: "error",
        });
      });
  };

  const handlePdfClick = (files: any) => {
    window.open(files.url, "_blank");
  };

  const getFormattedText = (text: string, maxLength: number, reverse: boolean) => {
    if (!text) return
    if (text.length < 1) return
    if (text.length < maxLength) return text
    return <TextWithViewMore text={text} maxLength={maxLength} reverse={reverse} />;
  };

  const downloadOrderFile = (orderDetails: any) => {

    if (!orderDetails.file) {
      alert('No File Attached')
      return
    }
    window.open(orderDetails.file.url, "_blank");
  }
  return loading ? (
    <Loader />
  ) : details ? (
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
                      Title/Name
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details.title}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      File Number
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details.fileNumber}
                      disabled={true}
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
                      Lawyer
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details.lawyer}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Court Name
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details.courtName}
                      disabled={true}
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
                      Case Number
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details.caseNumber}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Notes
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      defaultValue="Show Notes"
                      className="btn btn-primary w-50"
                      onClick={(e) =>
                        setPopupDetails({
                          show: true,
                          text: details.notes,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              {
                profileDetails.userType === 'team_member' ? (
                  <div className="form-group col-sm-6 pt-0">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="" className="mb-0">
                          Assigned Client
                        </label>
                      </div>
                      <div className="col-md-8">
                        <textarea
                          name=" Assigned Client"
                          className="form-control "
                          disabled
                          value={details._clients
                            .map((teams: any) => teams.name.fullName)
                            .join(",")}
                          rows={4}
                          cols={50}
                        />
                      </div>
                    </div>
                  </div>
                ) : (

                  <div className="form-group col-sm-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="" className="mb-0">
                          Assigned Team Member
                        </label>
                      </div>
                      <div className="col-md-8">
                        <textarea
                          name="Team Member"
                          className="form-control"
                          disabled
                          value={details._teamMembers
                            .map((teams: any) => teams.name.fullName)
                            .join(",")}
                          rows={4}
                          cols={50}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                        Upcoming Hearning
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={moment(details.upcomingHearing).format("YYYY-MM-DD")}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
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
            </div>
          </form>
          <div className="sub-title mb-1" id="order-section">
            <h5 className="font-weight-bold">Orders</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-responsive-md table-bordered common-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Order Date</th>
                  <th style={{ width: "8%" }}>Priority</th>
                  <th style={{ width: "15%" }}>Order summary</th>
                  <th style={{ width: "10%" }}>Action required</th>
                  <th style={{ width: "5%" }}>File</th>
                  <th style={{ width: "25%" }}>Service request</th>
                  <th style={{ width: "15%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {details.orders.map((item: any, index: number) => (
                  <tr>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.priority}</td>
                    <td>{getFormattedText(item.summary, 30, false)}</td>
                    <td>{getFormattedText(item.actionRequired, 50, true)}</td>
                    <td><i onClick={() => downloadOrderFile(item)} className="bx bxs-file-pdf text-10" /></td>
                    <td>
                      <select
                        name="servicerequest"
                        id="service-request"
                        className="form-control"
                        onChange={(e) => {
                          handleServiceChange(item, e.target.selectedOptions);
                        }}
                        multiple
                      >
                        {service.map((value: any, index: number) => (
                          <option key={index} value={value._id}>
                            {value.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        defaultValue="Submit"
                        className="btn btn-primary w-100"
                        onClick={(e) => submitServiceChange(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-top mt-3">
            {details.timeline.map((item: any, index: number) => (
              <>
                <div className="sub-title mb-1">
                  <h5 className="font-weight-bold">Time Line {index + 1}</h5>
                </div>
                <div className="row mb-3">
                  <div className="form-group col-sm-6">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <label htmlFor="" className="mb-0">
                          Judge Name
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          value={item.judgeName}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-sm-6 pt-0">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="" className="mb-0">
                          Purpose
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          value={item.purpose}
                          disabled={true}
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
                          Cause List
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          value={item.causeList}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-sm-6 pt-0">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="" className="mb-0">
                          BusinessDate
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="date"
                          className="form-control"
                          value={moment(item.businessDate).format("YYYY-MM-DD")}
                          disabled={true}
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
                          Next Date
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="date"
                          className="form-control"
                          value={moment(item.nextDate).format("YYYY-MM-DD")}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

            {/* <img src="../assets/images/timeline.png" alt="" class="w-100"> */}
          </div>
        </div>
      </section>
      <div className="sub-title mb-1 mt-4">
        <h5 className="font-weight-bold">Case Documents</h5>
        <h6>Note: View Option is only available for PDF file type. for other file types, please download and view.</h6>
      </div>
      <section className="card case-documents">
        <div className="card-body">
          <div className="form-group pt-0">
            <ul className="m-0 p-0 mt-3 row">
              {details.files.map((files: any) => {
                return (
                  <li
                    className="col-4 col-sm-3 col-lg-2 col-xl-2 mb-2 list-unstyled text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePdfClick(files)}
                  >
                    <i className="bx bxs-file-pdf text-14" />
                    <span className="d-block font-weight-500">
                      View/Download
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
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

export default ViewCase;
