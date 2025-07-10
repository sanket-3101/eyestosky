import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, showToast } from "../../../constant/util";
import axios from "../../../constant/axios";
import { Loader } from "../../../component/Loader";
import { apiConstants, TableAction } from "../../../constant/constant";
import Popup from "../../../component/Popup";
import Title from "../../../component/Title";

interface HashTagDetailsType {
  id: string;
  name: string;
  status: string;
  post_count: number;
  created_at: string;
}

function HashtagView() {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [details, setDetails] = useState<HashTagDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [popup_details, setPopupDetails] = useState<{
    show: boolean;
    text: string;
  }>({
    show: false,
    text: "",
  });

  useEffect(() => {
    if (!id) {
      showToast("Invalid id", { type: "error" });
      navigate("/hashtag-list");
      return;
    } else {
      getDetails(id);
    }
  }, [id]);

  const getDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(apiConstants.baseUrl + apiConstants.getHashtagDetailsById(id));
      setDetails(response.data);
    } catch (e) {
      showToast("Failed to fetch hashtag details", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field: keyof HashTagDetailsType, value: string) => {
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
    try {
      const payload = {
        name: details.name,
        status: details.status,
      };
      await axios.put(apiConstants.baseUrl + apiConstants.updateHashtagById(details.id), payload);
      showToast("Hashtag updated successfully", { type: "success" });
    } catch (e) {
      showToast("Failed to update hashtag", { type: "error" });
    }
  };

  return loading ? (
    <Loader />
  ) : details ? (
    <>
      {/* start: page */}
      <section className="card">
        <div className="card-body">
          <Title title="Hashtag Details" />
          <form method="post">
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
                      value={details.id}
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
                      value={details.name}
                      disabled={action === TableAction.view}
                      onChange={e => onChange('name', e.target.value)}
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
                      value={details.post_count}
                      disabled={true}
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
                      value={details.status}
                      disabled={action === TableAction.view}
                      onChange={e => onChange('status', e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
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
                      Created At
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
            </div>
          </form>
          {action !== TableAction.view && (
            <input
              type="button"
              value="Update"
              className="btn btn-primary w-30 mt-5"
              style={{ marginRight: '5px' }}
              onClick={onSubmit}
            />
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

export default HashtagView;
