import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, showToast } from "../../../constant/util";
import axios from "../../../constant/axios";
import { Loader } from "../../../component/Loader";
import { apiConstants, TableAction } from "../../../constant/constant";
import Popup from "../../../component/Popup";

interface PostDetailsType {
  id: string;
  media_url: string,
  media_type: string;
  description?: string;
  location?: string;
  latitude?: string;
  longitude?: string;
  status: string;
  created_at: string;
  caption?: string;
}

function PostView() {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [details, setDetails] = useState<PostDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
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
      navigate("/post-list");
      return;
    } else {
      getDetails(id);
    }
  }, [id]);

  const getDetails = async (id: string) => {
    setLoading(true);
    try {
      // Assuming endpoint similar to user: 'post/{id}/details'
      const response = await axios.get(apiConstants.baseUrl + `post/${id}/details`);
      setDetails(response.data);
    } catch (e) {
      showToast("Failed to fetch post details", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field: keyof PostDetailsType, value: string) => {
    if (!details) return;
    setDetails({ ...details, [field]: value });
  };

  const onSubmit = async () => {
    if (!id) {
      showToast("Invalid id", { type: "error" });
      return;
    }
    if (!details) {
      showToast("Invalid details", { type: "error" });
      return;
    }

    setSubmitLoading(true);
    try {
      // Prepare payload with correct types
      const payload = {
        media_url: details.media_url,
        media_type: details.media_type,
        description: details.description || '',
        location: details.location || '',
        latitude: details.latitude ? Number(details.latitude) : undefined,
        longitude: details.longitude ? Number(details.longitude) : undefined,
        status: details.status,
        // caption: details.caption || '',
      };
      await axios.put(
        apiConstants.baseUrl + apiConstants.postDetailsById(details.id),
        payload
      );
      showToast("Post updated successfully", { type: "success" });
    } catch (e) {
      showToast("Failed to update post", { type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : details ? (
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
                      value={formatDate(details.created_at)}
                      disabled={true}
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
                    <select
                      className="form-control"
                      value={details.media_type}
                      disabled={true}
                    // onChange={e => onChange('media_type', e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="image">Image</option>
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
                      Post Link
                    </label>
                  </div>
                  <div className="col-md-8">
                    <a
                      href={details?.media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-none"
                    >
                      {details?.media_url}
                    </a>
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
                      value={details.status}
                      onChange={e => onChange('status', e.target.value)}
                    >
                      <option value="approve">Approved</option>
                      <option value="reject">Rejected</option>
                      <option value="pending">Pending</option>
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
                      value={details.latitude || ''}
                      disabled={action === TableAction.view}
                      onChange={e => onChange('latitude', e.target.value)}
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
                      value={details.longitude || ''}
                      disabled={action === TableAction.view}
                      onChange={e => onChange('longitude', e.target.value)}
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
                  <div className="col-md-8">
                    {action === TableAction.edit ? (
                      <textarea
                        className="form-control"
                        value={details.description || ''}
                        rows={3}
                        onChange={e => onChange('description', e.target.value)}
                      />
                    ) : (
                      <input
                        defaultValue="Show Description"
                        className="btn btn-primary"
                        style={{ minWidth: '3rem' }}
                        onClick={() => setPopupDetails({ show: true, text: details.description || '' })}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group col-sm-6 pt-0">
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
                      value={details.caption || ''}
                      disabled={action === TableAction.view}
                      onChange={e => onChange('caption', e.target.value)}
                    />
                  </div>
                </div>
              </div>

            </div>
          </form>
          {action !== TableAction.view && (
            <>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: '5px' }}
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
          )}
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
