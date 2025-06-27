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
      console.log(response.data);
      setDetails(response.data);
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

    const data = {
      first_name: details.first_name,
      last_name: details.last_name, 
      country_name: details.country_name,
      description: details.description,
      gender: details.gender,
      ufo_witnessed: details.ufo_witnessed,
      status: details.status,
      avatar: details.avatar,
    }
    await axios.put(apiConstants.baseUrl + apiConstants.updateProfileById(details.id), data).then((response) => {
      console.log(response);
      if(response.data) {
        showToast("Profile Updated Sucessfully", {
          type: "success",
        });
      }else {
        showToast("Profile Updated Failed", {
          type: "error",
        });
      }
    });

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
          <form action="" method="post">
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
                        src={details?.avatar}
                        className="rounded img-fluid"
                        alt="Select Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      value={details?.first_name}
                      disabled={action === TableAction.view}
                      onChange={(e) => onChange('first_name', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6">
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
                      Country
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
                          onChange={(e) => onChange('description', e.target.value)}
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
                      UFO Witinessed
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={details?.ufo_witnessed}
                      disabled={action === TableAction.view}
                      onChange={(e) => onChange('ufo_witnessed', e.target.value)}
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
                      Block
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
                      Gender
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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
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
                {details?.posts.map((item: any, index: number) => (
                  <tr>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.media_type}</td>
                    <td>{item.media_url}</td>
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
          {
            action != TableAction.view && (
              <>
                <input
                  defaultValue="Update"
                  className="btn btn-primary w-30 mt-5"
                  style={{ marginRight: '5px' }}
                  onClick={onSubmit}
                />
              </>
            )
          }
        </div>
      </section>
s

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
