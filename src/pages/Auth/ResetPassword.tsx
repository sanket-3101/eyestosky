// Login.tsx

import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useState } from "react";
import Footer from "./Footer";
import { showToast } from "../../constant/util";
import axios, { AxiosError } from "axios";
import { apiConstants } from "../../constant/constant";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  console.log(token);

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!password || !confirm_password) {
      showToast("All Fields are Required", {
        type: "error",
      });

      return;
    }

    if (!token) {
      showToast("No Token Found", {
        type: "error",
      });

      return;
    }
    const response = await axios
      .post(apiConstants.baseUrl + apiConstants.resetPassword, {
        password: password,
        confirmPassword: confirm_password,
        token: token
      })
      .then((response) => {
        if (response) {
          showToast("Password Changed Successfully", {
            type: "success",
          });
          navigate("/login");
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
        <div className="center-sign pt-4 pb-3">
          <div className="panel card-sign">
            <div className="card-body pt-3 pb-3 forget-password-content">
              <a href="/" className="logo text-center w-100 d-inline-block">
                {/* <img
                  src={logo}
                  width={270}
                  height={135}
                  alt="Rab & Rab Associates LLP"
                /> */}
              </a>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="password"
                  role="tabpanel"
                  aria-labelledby="password-tab"
                >
                  <form action="" method="post">
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <div className="input-group">
                        <input
                          name="password"
                          type="text"
                          className="form-control form-control-md"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="clearfix">
                        <label className="float-start">Confirm Password</label>
                      </div>
                      <div className="input-group">
                        <input
                          name="confirm_password"
                          type="password"
                          className="form-control form-control-md"
                          value={confirm_password}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <button
                    onClick={handleResetPassword}
                    className="btn btn-primary mt-2"
                  >
                    <span style={{ marginLeft: "5px" }} className="sr-only">
                      Reset Password
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default ResetPassword;
