// Login.tsx

import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import {
  loginWithEmailPassword,
  verifyPhoneNumber,
} from "../../redux/slice/Auth";
import { apiState } from "../../constant/constant";
import {  showToast } from "../../constant/util";

function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);
  const { currentScreen } = useAppSelector((state) => state.navigation);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log(currentScreen);
  //   if (currentScreen === "otp") {
  //     navigate("/otp");
  //   }
  // }, [navigate, currentScreen]);

  // useEffect(() => {
  //   if (status === apiState.failed) {
  //     showToast(error?.message, {
  //       type: "error",
  //     });
  //   }
  // }, [status]);



  const handleSignIn = async () => {

    // if (!showOtp) {
    //   // Validate email and password
    //   if (!email || !password) {
    //     // Handle validation error
    //     showToast("All Fields are required", {
    //       type: "error",
    //     });
    //     return;
    //   }

    //   const response = await dispatch(
    //     loginWithEmailPassword({ email, password })
    //   );
    //   console.log(response);
    // } else {
    //   // Validate phone number
    //   if (!phoneNumber) {
    //     // Handle validation error
    //     showToast("Phone number is required", {
    //       type: "error",
    //     });
    //     return;
    //   }
    //   dispatch(verifyPhoneNumber({ phoneNumber }));
    // }
    navigate('/')
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
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${!showOtp ? "active" : ""} `}
                    id="password-tab"
                    type="button"
                    role="tab"
                    aria-controls="password"
                    aria-selected="true"
                    onClick={() => setShowOtp(false)}
                  >
                    Login using email
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${showOtp ? "active" : ""} `}
                    id="otp-tab"
                    type="button"
                    role="tab"
                    aria-controls="otp"
                    aria-selected="false"
                    onClick={() => setShowOtp(true)}
                  >
                    Login with phone number
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {!showOtp ? (
                  <div
                    className="tab-pane fade show active"
                    id="password"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                  >
                    <form action="" method="post">
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <div className="input-group">
                          <input
                            name="username"
                            type="text"
                            className="form-control form-control-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="clearfix">
                          <label className="float-start">Password</label>
                        </div>
                        <div className="input-group">
                          <input
                            name="pwd"
                            type="password"
                            className="form-control form-control-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div
                    className="tab-pane fade show active"
                    id="otp"
                    role="tabpanel"
                    aria-labelledby="otp-tab"
                  >
                    <div className="form-group mb-3">
                      <label>Phone Number</label>
                      <div className="input-group">
                        <input
                          name="username"
                          type="text"
                          className="form-control form-control-md"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <button
                    onClick={handleSignIn}
                    className="btn btn-primary mt-2"
                    disabled={status === apiState.loading}
                  >
                    {status === apiState.loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}

                    <span style={{ marginLeft: "5px" }} className="sr-only">
                      Sign In
                    </span>
                  </button>
                </div>
              </div>
              <p
                onClick={() => navigate("/forgot-password")}
                className="font-weight-bold text-center pt-3 d-block signup-link"
                style={{ color: "#A000EB", cursor: "pointer" }}
              >
                Forgot Password?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Login;
