import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { UserDetailsType, apiConstants } from "../../../constant/constant";
import axios from "../../../constant/axios";
import { showToast } from "../../../constant/util";
import {
  getProfileDetails,
  setUserProfileDetails,
} from "../../../redux/slice/Auth";
function Profile() {
  const profileDetails = useAppSelector((state) => state.auth.profileDetails);
  const [userDetails, setUserDetails] = React.useState<UserDetailsType>({
    ...profileDetails,
  });
  const dispatch = useAppDispatch();
  const handleChange = (data: any) => {
    // setUserDetails({
    //   ...userDetails,
    //   ...data,
    // });
  };

  useEffect(() => {
      setUserDetails({
        name: {
          salutation: 'Mr',
          firstName: 'Test',
          fullName: "Mr Test User",
          lastName: 'User'
        },
        designation: 'Test',
        email: 'Testing@gmail.com',
        mobile: "+917359756473",
        moblieCode: "+91",
        origanization: "Test",
        userType: "ceo",
        profilePicture: {
            key: "1",
            url: "https://avatar.iran.liara.run/public/boy?username=Ash"
        },
        whatsappMobile: "+917359756473"
      })
    
  }, [])
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // if (e.target.files && e.target.files.length > 0) {
    //   try {
    //     const formData = new FormData();
    //     formData.append("profileImage", e.target.files[0]);

    //     // Make a POST request to your server with the FormData
    //     const response = await axios.post(
    //       apiConstants.baseUrl + apiConstants.updateProfileImage,
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );

    //     console.log("Image uploaded successfully:", response.data);

    //     if (response.data) {
    //       const updateProfile = {
    //         ...userDetails,
    //         profilePicture: {
    //           ...response.data.data,
    //         },
    //       };
    //       setUserDetails({
    //         ...updateProfile,
    //       });
    //       setUserProfileDetails({
    //         ...updateProfile,
    //       });
    //       showToast("Profile Pic updated Succesfully", {
    //         type: "success",
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //     showToast("Error while uploading Pic", {
    //       type: "error",
    //     });
    //   }
    // }
  };

  const handleSubmit = async () => {
    return
    const requestObject = {
      name: {
        firstName: userDetails.name.firstName,
        lastName: userDetails.name.lastName,
        salutation: userDetails.name.salutation,
      },
      designation: userDetails.designation,
      // userType: userDetails.userType,
      // email: userDetails.email,
      // mobile: userDetails.mobile,
      whatsappMobile: userDetails.whatsappMobile,
    };
    console.log(requestObject);
    await axios
      .post(apiConstants.baseUrl + apiConstants.updateProfile, requestObject)
      .then((response) => {
        showToast("Profile updated Succesfully", {
          type: "success",
        });
        setUserProfileDetails({
          ...userDetails,
        });
        dispatch(getProfileDetails({}));
      })
      .catch((error) => {
        showToast("Error while updating profile", {
          type: "error",
        });
      });
  };

  const getProfileImage = () => {
    if (userDetails?.profilePicture?.url) {
      return (
        <img
          src={userDetails?.profilePicture?.url}
          className="rounded img-fluid"
          alt="Select Image"
        />
      );
    }
    return <button className="btn btn-primary">Select Image</button>;
  };
  if (Object.keys(userDetails).length === 0) return null;
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 col-xxl-3 mb-4">
          <section className="card">
            <div className="card-body">
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <div
                className="thumb-info"
                style={{ display: "flex", justifyContent: "center" }}
                // onClick={() => document.getElementById("fileInput")?.click()}
                id="uploadButton"
              >
                {getProfileImage()}
              </div>
              <div className="row">
                <div className="form-group col">
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={(e) =>  document.getElementById("fileInput")?.click()}
                  >
                    Edit Image
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-lg-8 col-xl-8 col-xxl-9">
          <div className="tabs">
            <ul className="nav nav-tabs tabs-primary" role="tablist">
              <li className="nav-item active" role="presentation">
                <button
                  className="nav-link active"
                  data-bs-target="#edit"
                  data-bs-toggle="tab"
                  aria-selected="true"
                  role="tab"
                >
                  Personal Information
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div id="edit" className="tab-pane active show" role="tabpanel">
                <div className="row mb-4">
                <div className="form-group col col-md-6 pt-3">
                    <label htmlFor="">Salutation</label>
                    <select
                      className="d-block form-control"
                      // style={{ width: "4.5rem" }}
                      value={userDetails.name.salutation}
                      onChange={(e) => {
                        handleChange({
                          name: {
                            ...userDetails.name,
                            salutation: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Dr">Dr</option>
                      <option value="Mx">Mx</option>
                    </select>
                  </div>
                  <div className="form-group col col-md-6">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vastal"
                      value={userDetails.name.firstName}
                      onChange={(e) => {
                        handleChange({
                          name: {
                            ...userDetails.name,
                            firstName: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
           
                </div>
                
                <div className="row mb-4">
                  <div className="form-group col col-md-6">
                    <label htmlFor="">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CEO"
                      value={userDetails.designation}
                      onChange={(e) => {
                        handleChange({
                          designation: e.target.value,
                        });
                      }}
                    />
                  </div>
               <div className="form-group col col-md-6 pt-0">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Shah"
                      value={userDetails.name.lastName}
                      onChange={(e) => {
                        handleChange({
                          name: {
                            ...userDetails.name,
                            lastName: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="form-group col col-md-6">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="vastal@gmail.com"
                      value={userDetails.email}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group col col-md-6 pt-0">
                    <label htmlFor="">Primary Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+9191234567890"
                      value={userDetails.mobile}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="form-group col col-md-6 pt-0">
                    <label htmlFor="">WhatsApp Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+9191234567890"
                      value={userDetails.whatsappMobile}
                      maxLength={10}
                      onChange={(e) => {
                        handleChange({
                          whatsappMobile: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group col col-md-6 pt-0">
                    <label htmlFor="">User Type</label>
                    <select
                      name=""
                      className="w-100 d-block form-control"
                      value={userDetails.userType}
                      disabled={true}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    >
                      <option value="Select User Type">Select User Type</option>
                      <option value="ceo">CEO</option>
                      <option value="team_member">Team Member</option>
                    </select>
                  </div>
                  {/* <div className="form-group col col-md-6 pt-0">
                    <label htmlFor="">Profile Image</label>
                    <div className="upload-file">
                      <input
                        type="file"
                        id="myFile"
                        name="filename"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="form-group col">
                    <button
                      type="submit"
                      className="btn btn-primary mt-2"
                      onClick={handleSubmit}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
