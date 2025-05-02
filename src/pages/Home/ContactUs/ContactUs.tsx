import contactus from "../../../images/contact-us.png";
import { useState } from "react";
import { showToast } from "../../../constant/util";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
function ContactUs() {

  const [details, setDetails] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (data: any) => {
    setDetails({
      ...details,
      ...data,
    });
  };

  const handleSubmit = async () => {
    const { subject, message } = details;

    if (!subject || !message) {
      showToast("All Fields is Required", {
        type: "error",
      });
      return;
    }
    const requestObject = {
      subject,
      message,
    };
    const response = await axios
      .post(apiConstants.baseUrl + apiConstants.addContact, requestObject)
      .then(() => {
        showToast("Message successfully sent. We will revert to you shortly!", {
          type: "success",
        });
        setDetails({
          subject: "",
          message: ""
        })
      })
      .catch((error) => {
        showToast("Something went wrong try again", {
          type: "error",
        });
      });
  };
  return (
    <div className="row align-items-center">
      <div className="col-md-12 col-xl-8 mx-auto">
        <section className="card common-cms-page-content">
          <div className="card-body">
            <h2 className="font-weight-500 mt-0 mb-0"> Contact Us</h2>
            <p className="mt-0"> Kindly contact us from here and we will reach out to you</p>
            <div className="row">
              <div className="col-lg-6 contact-form">
                <label className="mb-2 font-weight-500">Subject</label>
                <div className="input-group mb-3">
                  {/* <span className="input-group-text">
                    <i className="bx bx-envelope text-4" />
                  </span> */}

                  <input
                    name="email"
                    type="text"
                    className="form-control form-control-md"
                    placeholder="Enter your subject"
                    value={details.subject}
                    onChange={(e) => handleChange({ subject: e.target.value })}
                  />
                </div>
                <label className="mb-2 font-weight-500  ">Message</label>
                <div className="input-group mb-3">

                  <textarea
                    name="message"
                    id=""
                    className="form-control form-control-md"
                    placeholder="Enter your message"
                    defaultValue={""}
                    value={details.message}
                    onChange={(e) => handleChange({ message: e.target.value })}
                    rows={8}
                  />
                </div>
                <div className="col-sm-12">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2 w-100"
                    onClick={handleSubmit}
                  >
                    Send Message
                  </button>
                </div>
              </div>
              <div className="col-lg-6 contact-img">
                <img src={contactus} alt="" className="w-100" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;
