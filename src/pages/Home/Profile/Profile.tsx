import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { apiConstants } from "../../../constant/constant";
import axios from "../../../constant/axios";
import { showToast } from "../../../constant/util";
import {
    getProfileDetails,
    setUserProfileDetails,
  } from "../../../redux/slice/Auth";
import { Loader } from "../../../component/Loader";

interface UserDetailsType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

function Profile() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const profileDetails = useAppSelector((state) => state.auth.profileDetails);

  useEffect(() => {
    if (Object.keys(profileDetails).length === 0) {
      dispatch(getProfileDetails({}));
    } else {
      setUserDetails(profileDetails);
      setLoading(false);
    }
  }, [profileDetails, dispatch]);

  useEffect(() => {
    if (userDetails) {
      setLoading(false);
    }
  }, [userDetails]);

  const handleChange = (field: keyof UserDetailsType, value: string) => {
    if (!userDetails) return;
    setUserDetails({
      ...userDetails,
      [field]: value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageLoading(true);
      try {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        const response = await axios.post(
          apiConstants.baseUrl + apiConstants.updateProfileImage,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          const updatedDetails: UserDetailsType = {
            ...userDetails!,
            avatar: response.data.avatar || response.data.url,
          };
          setUserDetails(updatedDetails);
          dispatch(setUserProfileDetails(updatedDetails));
          showToast("Profile picture updated successfully", {
            type: "success",
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        showToast("Error uploading profile picture", {
          type: "error",
        });
      } finally {
        setImageLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!userDetails) {
      showToast("No user details available", { type: "error" });
      return;
    }

    setSubmitLoading(true);
    try {
      const payload = {
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
      };

      const response = await axios.put(
        apiConstants.baseUrl + apiConstants.updateProfile,
        payload
      );

      if (response.data) {
        dispatch(setUserProfileDetails(userDetails));
        showToast("Profile updated successfully", {
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile", {
        type: "error",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const getProfileImage = () => {
    if (userDetails?.avatar) {
      return (
        <img
          src={userDetails.avatar}
          className="rounded-circle img-fluid"
          alt="Profile"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      );
    }
    return (
      <div 
        className="rounded-circle bg-light d-flex align-items-center justify-content-center"
        style={{ width: "150px", height: "150px" }}
      >
        <i className="bx bx-user text-muted" style={{ fontSize: "3rem" }}></i>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <section className="card">
      <div className="card-body">
        <h2 className="mb-4" style={{ color: '#04105a' }}>Profile Settings</h2>
        
        <div className="row">
          {/* Profile Image Section */}
          <div className="col-lg-4 col-xl-3 mb-4">
            <div className="text-center">
              <div className="position-relative d-inline-block">
                {getProfileImage()}
                {imageLoading && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded-circle">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-3">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => document.getElementById("fileInput")?.click()}
                  disabled={imageLoading}
                >
                  {imageLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-camera me-2"></i>
                      Change Photo
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="col-lg-8 col-xl-9">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={userDetails?.first_name || ""}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={userDetails?.last_name || ""}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={userDetails?.email || ""}
                    disabled
                  />
                  <small className="text-muted">Email cannot be changed</small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-save me-2"></i>
                      Update Profile
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setUserDetails(profileDetails);
                    showToast("Changes discarded", { type: "info" });
                  }}
                  disabled={submitLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
