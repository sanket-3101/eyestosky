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
function HashtagView() {
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
                                          ID
                                        </label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={'1'}
                                            disabled={true}
                                        />  
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-sm-6 pt-0">
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
                                            value={'#ufo'}
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
                                            Total Post
                                        </label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={'150'}
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
                                            <option value="1">Active</option>
                                            <option value="0">Deactivate</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            {/* {
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
              } */}
                            {/* <div className="form-group col-sm-6 pt-0">
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
              </div> */}
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
                    <input
                        defaultValue="Update"
                        className="btn btn-primary w-30 mt-5"
                        style={{ marginRight: '5px' }}
                    />
                    <input
                        defaultValue="Delete"
                        className="btn btn-primary w-30 mt-5"
                    />
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

export default HashtagView;
