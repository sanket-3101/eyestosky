// Login.tsx

import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHook";
import { verifyOTP, verifyPhoneNumber } from "../../redux/slice/Auth";
import { apiState } from "../../constant/constant";
import { navigateToScreen } from "../../redux/slice/Navigation";
import { showToast } from "../../constant/util";

function Otp() {
  const [otp, setOTP] = useState<number>();

  const navigate = useNavigate();
  const { phoneNumber, status, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(navigateToScreen(""));
  }, []);

  useEffect(() => {
    if (status === apiState.failed) {
      showToast(error?.message, {
        type: "error",
      });
    }
  }, [status]);

  const handleOTP = async () => {
    if (!otp) {
      showToast("OTP field cannot be empty", {
        type: "error",
      });
    } else {

      dispatch(verifyOTP({ otp, phoneNumber }));
    }
  };

  const handleResendOtp = () => {
    dispatch(verifyPhoneNumber({ phoneNumber }));
    showToast("Otp has been resend to your moblie number", {
      type: "success"
    });
  }

  return (
    <>
      <section className="body-sign">
        <div className="center-sign pt-4 pb-3">
          <div className="panel card-sign">
            <div className="card-body pt-3 pb-3 forget-password-content">
              <a className="logo text-center w-100 d-inline-block">
                <img
                  src={logo}
                  width={270}
                  height={135}
                  alt="Rab & Rab Associates LLP"
                />
              </a>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="otp"
                  role="tabpanel"
                  aria-labelledby="otp-tab"
                >
                  <div className="form-group mb-3">
                    <label>Enter OTP</label>
                    <div className="input-group">
                      <input
                        name="otp"
                        type="number"
                        className="form-control form-control-md"
                        value={otp}
                        onChange={(e) => setOTP(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <button onClick={handleOTP} className="btn btn-primary mt-2">
                    {status === apiState.loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    <span className="sr-only">Submit</span>
                  </button>
                </div>
              </div>
              <p
                onClick={() => navigate("/login")}
                className="font-weight-bold text-center pt-3 d-block signup-link"
                style={{ color: "#030844", cursor: "pointer" }}
              >
                login?
              </p>

              <p
                onClick={() => handleResendOtp()}
                className="font-weight-bold text-center d-block signup-link"
                style={{ color: "#030844", cursor: "pointer" }}
              >
                Resend
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

export default Otp;
