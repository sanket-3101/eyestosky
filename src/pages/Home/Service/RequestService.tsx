import contactus from "../../../images/contact-us.png";
import { useEffect, useState } from "react";
import { showToast } from "../../../constant/util";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
import { useAppSelector } from "../../../redux/reduxHook";
import { AxiosError } from "axios";
function RequestService() {
  const profileDetails = useAppSelector((state) => state.auth.profileDetails);

  const [description, setDescription] = useState("");
  const [service, setService] = useState<any>([]);
  const [selectedService, setSelectedService] = useState<string[]>([]);
  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    await axios
      .get(apiConstants.getService)
      .then((response) => {
        setService(response.data);
      })
      .catch(() => {
        showToast("Failed to get Services", {
          type: "error",
        });
      });
  };
  const handleSubmit = async () => {
    if (selectedService.length < 1) {
      showToast("Select Service Request", {
        type: "error",
      });

      return;
    }
    const payload = {
      _service: selectedService,
      description: description,
    };

    await axios
      .post(apiConstants.submitServiceRequest, payload)
      .then((response) => {
        if (response) {
          showToast("Service request submitted successfully.", {
            type: "success",
          });
          setSelectedService([]);
          setDescription("");
        }
      })
      .catch((err: any) => {
        if (err.response) {
          showToast(err.response.data.message, {
   
            type: 'error',
          });
        }
      });
  };
  const handleServiceChange = (
    itemSelectedId: HTMLCollectionOf<HTMLOptionElement>
  ) => {
    const ids = Array.from(itemSelectedId, (option) => option.value);
    setSelectedService(ids);
  };

  if (!profileDetails) {
    return null;
  }
  return (
    <div className="row align-items-center">
      <div className="col-md-12 col-xl-8 mx-auto">
        <section className="card common-cms-page-content">
          <div className="card-body">
            <h2 className="text-center font-weight-500 mt-0">
              {" "}
              Service Request
            </h2>
            <div className="row">
              <div className="col-lg-12 contact-form">
                <div className="input-group mb-3">
                  <input
                    name="name"
                    type="text"
                    className="form-control form-control-md"
                    placeholder="Full Name"
                    value={profileDetails.name?.fullName}
                    disabled={true}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-envelope text-4" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-md"
                    placeholder="Email"
                    value={profileDetails.email}
                    disabled={true}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-phone text-4" />
                  </span>
                  <input
                    name="phone_number"
                    type="text"
                    className="form-control form-control-md"
                    placeholder="Phone Number"
                    value={profileDetails.mobile}
                    disabled={true}
                  />
                </div>
                <div className="input-group mb-3">
                  <textarea
                    name="description"
                    id="description"
                    className="form-control form-control-md"
                    placeholder="Description"
                    defaultValue={""}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <select
                    name="servicerequest"
                    id="service-request"
                    className="form-control"
                    onChange={(e) => {
                      handleServiceChange(e.target.selectedOptions);
                    }}
                    multiple
                    value={selectedService}
                  >
                    {service.map((value: any, index: number) => (
                      <option key={index} value={value._id}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-12">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2 w-100"
                    onClick={handleSubmit}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RequestService;
