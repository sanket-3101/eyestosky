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
import Title from "../../../component/Title";

interface UserDetailsApiType {
  id: string,
  first_name: string,
  last_name: string,
  user_name: string,
  email: string,
  avatar: string,
  description: string,
  country_name: string,
  gender: string,
  ufo_witnessed: string,
  status: string,
  created_at: string,
  posts: [
    {
      created_at: string,
      id: string,
      media_type: string,
      media_url: string,
      status: string,
    }[]
  ]
}

function ViewUser() {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [details, setDetails] = useState<UserDetailsApiType | null>(null);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
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
      navigate("/user-list");
      return;
    } else {
      getDetails(id);
    }
  }, [id]);

  const getDetails = async (id: string) => {
    await axios.get(apiConstants.baseUrl + apiConstants.getProfileById(id)).then((response) => {
      const details: any ={
        ...response.data,
        country_name: response.data.country_name || "",
        gender: response.data.gender || "",
        ufo_witnessed: response.data.ufo_witnessed || "",
      }
      setDetails(details);
      setLoading(false);
    });
  };


  const onChange = (field: keyof UserDetailsApiType, value: string) => {
    setDetails({ ...details, [field]: value } as UserDetailsApiType);
  }

  const onSubmit = async () => {
    if (!id) {
      showToast("Invalid id", {
        type: "error",
      });
      return;
    }

    if (!details) {
      showToast("Invalid details", {
        type: "error",
      });
      return;
    }

    setSubmitLoading(true);
    const data: any = {
      first_name: details.first_name,
      last_name: details.last_name,
      // description: details.description,
      status: details.status,
      // avatar: details.avatar,
    }


    if (details.country_name.length > 0) {
      data.country_name = details.country_name;
    }

    if (details.gender.length > 0) {
      data.gender = details.gender;
    }

    if (details.ufo_witnessed.length > 0) {
      data.ufo_witnessed = details.ufo_witnessed;
    }



    try {
      const response = await axios.put(apiConstants.baseUrl + apiConstants.updateProfileById(details.id), data);
      console.log(response);
      if (response.data) {
        showToast("Profile Updated Successfully", {
          type: "success",
        });
      } else {
        showToast("Profile Update Failed", {
          type: "error",
        });
      }
    } catch (error) {
      showToast("Profile Update Failed", {
        type: "error",
      });
    } finally {
      setSubmitLoading(false);
    }
  }

  // const getFormattedText = (text: string, maxLength: number, reverse: boolean) => {
  //   // if (!text) return
  //   // if (text.length < 1) return
  //   // if (text.length < maxLength) return text
  //   // return <TextWithViewMore text={text} maxLength={maxLength} reverse={reverse} />;
  // };

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* start: page */}
      <section className="card">
        <div className="card-body">
          <Title title="User Details" />
          <form action="" method="post">
            <div className="row mb-3">
              <div className="form-group col-sm-12 pt-0">

                {
                  details?.avatar && (
                    <>
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
                              src={details?.avatar}
                              className="rounded img-fluid"
                              alt="Select Image"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }


              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Username
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details?.user_name}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      First Name
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details?.first_name}
                      disabled={action === TableAction.view}
                      onChange={(e) => onChange('first_name', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Last Name
                    </label>
                  </div>

                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details?.last_name}
                      disabled={action === TableAction.view}
                      onChange={(e) => onChange('last_name', e.target.value)}
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
                      value={details?.email}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Country<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details?.country_name}
                      disabled={action === TableAction.view}
                      onChange={(e) => onChange('country_name', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
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
                          value={details?.description}
                          rows={4}
                          cols={50}
                          disabled={true}
                        // onChange={(e) => onChange('description', e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <input
                          defaultValue="Description"
                          className="btn btn-primary w-60"
                          onClick={(e) =>
                            setPopupDetails({
                              show: true,
                              text: details?.description || '',
                            })
                          }
                        />
                      </div>
                    )
                  }

                </div>
              </div>
              <div className="form-group col-sm-6">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      UFO Witnessed<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-8">
                    <select
                      className="d-block form-control"
                      disabled={action === TableAction.view}
                      value={details?.ufo_witnessed}
                      onChange={(e) => onChange('ufo_witnessed', e.target.value)}
                    >
                      <option value="">Select UFO Witnessed</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
            <div className="row mb-3">
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
                      value={details?.status}
                      onChange={(e) => {
                        onChange('status', e.target.value);
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="" className="mb-0">
                      Gender<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-8">
                    <select
                      className="d-block form-control"
                      disabled={action === TableAction.view}
                      // style={{ width: "4.5rem" }}
                      value={details?.gender}
                      onChange={(e) => {
                        onChange('gender', e.target.value);
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {
            action != TableAction.view && (
              <>
                <button
                  type="button"
                  className="btn btn-primary mt-5 mb-5"
                  onClick={onSubmit}
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </>
            )
          }
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
                {details?.posts.map((item: any, index: number) => (
                  <tr>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.media_type}</td>
                    <td>
                      <a
                        href={item.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-decoration-none"
                      >
                        {item.media_url}
                      </a>
                    </td>
                    <td>{item.status}</td>
                    {/* <td>{getFormattedText(item.summary, 30, false)}</td> */}
                    {/* <td>{getFormattedText(item.actionRequired, 50, true)}</td> */}
                    <td>
                      <a onClick={() => navigate(`/post-list/edit/${item.id}`)}>
                        {/* <i className="bx bxs-trash-alt text-6 text-primary cur-pointer mr-5" /> */}
                        <i className='bx bxs-edit-alt text-6 text-primary cur-pointer' />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  );
}

export default ViewUser;
