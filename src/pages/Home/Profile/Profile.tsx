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
import { UserDetailsType } from "../../../constant/constant";
import Title from "../../../component/Title";


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
      const file = e.target.files[0];

      // File validation
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (file.size > maxSize) {
        showToast("File size too large. Please select a file under 5MB.", { type: "error" });
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        showToast("Invalid file type. Please select an image file.", { type: "error" });
        return;
      }

      setImageLoading(true);
      try {
        const auth_token = localStorage.getItem('auth_token');

        // Step 1: Get presigned URL from S3
        const presignResponse = await axios.post(
          apiConstants.baseUrl + apiConstants.presign,
          {
            file_name: 'avatar.jpg',
            content_type: file.type
          },
          {
            headers: {
              Authorization: 'Bearer ' + auth_token
            }
          }
        );

        if (!presignResponse.data || !presignResponse.data.url) {
          throw new Error('Failed to get upload URL');
        }

        // Step 2: Upload file to S3 using presigned URL
        const uploadResponse = await fetch(presignResponse.data.url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file to S3');
        }

        // Step 3: Extract clean S3 URL from presigned URL
        const presignedUrl = presignResponse.data.url;
        const cleanS3Url = presignedUrl.split('?')[0]; // Remove query parameters

        // Update profile avatar with the clean S3 link (backend will handle old image cleanup)
        const avatarResponse = await axios.put(
          apiConstants.baseUrl + apiConstants.updateProfileAvatar,
          {
            avatar: cleanS3Url,
          },
          {
            headers: {
              Authorization: 'Bearer ' + auth_token
            }
          }
        );

        if (avatarResponse.data) {
          const updatedDetails: UserDetailsType = {
            ...userDetails!,
            avatar: cleanS3Url,
          };
          setUserDetails(updatedDetails);
          dispatch(setUserProfileDetails(updatedDetails));
          showToast("Profile picture updated successfully", {
            type: "success",
          });
        }
      } catch (error: any) {
        console.error("Error uploading image:", error);

        if (error.response?.status === 413) {
          showToast("File too large", { type: "error" });
        } else if (error.response?.status === 415) {
          showToast("Invalid file type", { type: "error" });
        } else if (error.message === 'Failed to get upload URL') {
          showToast("Upload service unavailable", { type: "error" });
        } else {
          showToast("Error uploading profile picture", { type: "error" });
        }
      } finally {
        setImageLoading(false);
        // Reset file input
        e.target.value = '';
      }
    }
  };

  const handleRemoveProfileImage = async () => {
    if (!userDetails?.avatar) {
      showToast("No profile image to remove", { type: "info" });
      return;
    }

    setImageLoading(true);
    try {
      const auth_token = localStorage.getItem('auth_token');

      // Option 1: Backend handles S3 deletion (recommended)
      const response = await axios.put(
        apiConstants.baseUrl + apiConstants.updateProfileAvatar,
        {
          avatar: "",
        },
        {
          headers: {
            Authorization: 'Bearer ' + auth_token
          }
        }
      );

      if (response.data) {
        const updatedDetails: UserDetailsType = {
          ...userDetails!,
          avatar: "",
        };
        setUserDetails(updatedDetails);
        dispatch(setUserProfileDetails(updatedDetails));
        showToast("Profile picture removed successfully", {
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error removing profile image:", error);
      showToast("Error removing profile picture", {
        type: "error",
      });
    } finally {
      setImageLoading(false);
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
        <Title title="Profile Settings" />

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
                <div className="d-flex gap-2 justify-content-center">
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
                  {userDetails?.avatar && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={handleRemoveProfileImage}
                      disabled={imageLoading}
                    >
                      {imageLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Removing...
                        </>
                      ) : (
                        <>
                          <i className="bx bx-trash me-2"></i>
                          Remove
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="col-lg-8 col-xl-9">
            <form>
              <div className="row mb-3">
                {/* <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user_name"
                    value={userDetails?.user_name || ""}
                    onChange={(e) => handleChange('user_name', e.target.value)}
                    disabled={true}
                  />
                </div> */}
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
