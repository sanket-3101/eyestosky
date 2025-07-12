// Login.tsx


import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import {
  loginWithEmailPassword,
} from "../../redux/slice/Auth";
import { apiState } from "../../constant/constant";
import { showToast } from "../../constant/util";

function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (status === apiState.failed) {
      showToast(error?.message, {
        type: "error",
      });
    }
  }, [status]);



  const handleSignIn = async () => {
    if (!email || !password) {
      // Handle validation error
      showToast("All Fields are required", {
        type: "error",
      });
      return;
    }

    await dispatch(
      loginWithEmailPassword({ email, password })
    );
  };

  return (
    <>
      <section className="body-sign">
        <div className="center-sign pt-4 pb-3">
          <div className="panel card-sign">
            <div className="card-body pt-3 pb-3 forget-password-content">

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
                {/* <li className="nav-item" role="presentation">
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
                </li> */}
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
              {/* <p
                onClick={() => navigate("/forgot-password")}
                className="font-weight-bold text-center pt-3 d-block signup-link"
                style={{ color: "#030844", cursor: "pointer" }}
              >
                Forgot Password?
              </p> */}
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
