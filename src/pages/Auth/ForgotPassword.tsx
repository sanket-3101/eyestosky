// Login.tsx

import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useState } from "react";
import Footer from "./Footer";
import Modal from "../../component/Modal";
import { showToast } from "../../constant/util";
import axios from "../../constant/axios";
import { apiConstants } from "../../constant/constant";
import { AxiosError } from "axios";
function ForgotPassword() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => {
    document.documentElement.classList.add("modal-open");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.documentElement.classList.remove("modal-open");
    setIsModalOpen(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showToast("Email is required", {
        type: "error",
      });

      return;
    }
    const response = await axios
      .post(apiConstants.baseUrl + apiConstants.forgotPassword, {
        email,
      })
      .then((response) => {
        if (response) {
          openModal();
        }
      })
      .catch((error: AxiosError) => {
        const data: any = error.response?.data;
        showToast(data.message, {
          type: "error",
        });
      });

    console.log(response);
  };
  return (
    <>
      <section className="body-sign">
        <div className="center-sign pt-4 pb-3 d-flex align-items-center justify-content-center h-100">
          <div className="panel card-sign w-100">
            <div className="card-body pt-3 pb-3 forget-password-content">
              <a href="/" className="logo text-center w-100 d-inline-block">
                <img
                  src={logo}
                  width={270}
                  height={135}
                  alt="Rab & Rab Associates LLP"
                />
              </a>

              <div className="form-group mb-3">
                <label>Email</label>
                <div className="input-group">
                  <input
                    name="username"
                    type="email"
                    className="form-control form-control-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-center">
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={handleForgotPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </div>

              <p
                onClick={() => navigate("/login")}
                className="font-weight-bold text-center pt-3 d-block signup-link"
                style={{ color: "#030844", cursor: "pointer" }}
              >
                Login
              </p>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default ForgotPassword;
