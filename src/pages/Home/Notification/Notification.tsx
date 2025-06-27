import { useState } from "react";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
import { showToast } from "../../../constant/util";

function Notification() {
  const [loading, setLoading] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState<any>({
    device_type: "android",
    title: "",
    message: "",
  });

  const handleSubmit = () => {
    const { device_type, title, message } = notificationDetails
    if (!title || !device_type || !message) {
      showToast("All Filed Required", { type: "error" });
      return
    }
    setLoading(true);
    axios.post(apiConstants.baseUrl + apiConstants.sendNotification(), notificationDetails).then((response) => {
      setLoading(false);
      if (response.data) {
        showToast("Notification Send Successfully", { type: "success" });
        return
      }
      showToast("Failed to Send notification", { type: "error" });
    });
  }

  return <section className="card">
    <div className="card-body">
      <form method="post">
        <div className="row mb-3">
          <div className="form-group col-sm-6 pt-0">
            <div className="row align-items-center">
              <div className="col-md-4">
                <label htmlFor="" className="mb-0">
                  Device
                </label>
              </div>
              <div className="col-md-8">
                <select
                  className="d-block form-control"
                  value={notificationDetails.device_type}
                  onChange={(e) => setNotificationDetails({ ...notificationDetails, device_type: e.target.value })}
                >
                  <option value="android">Android</option>
                  <option value="ios">IOS</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col col-md-6 pt-0">
            <div className="row align-items-center">
              <div className="col-md-4">
                <label htmlFor="" className="mb-0">
                  Title
                </label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  value={notificationDetails.title}
                  onChange={(e) => setNotificationDetails({ ...notificationDetails, title: e.target.value })}
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
                  Message
                </label>
              </div>
              <div className="col-md-8">
                <textarea
                  name="Message"
                  className="form-control"
                  value={notificationDetails.message}
                  onChange={(e) => setNotificationDetails({ ...notificationDetails, message: e.target.value })}
                  rows={4}
                  cols={50}
                  placeholder="Enter Message"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <input
        defaultValue="Submit"
        className="btn btn-primary w-30 mt-5"
        style={{ marginRight: "5px" }}
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  </section>
}

export default Notification;
