import { Outlet, useNavigate } from "react-router-dom";

import Header from "../component/Header";
import Siderbar from "../component/Siderbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxHook";
import { getProfileDetails, resetState, setLoggedIn } from "../redux/slice/Auth";

function Main({ children }: { children?: React.ReactElement }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileDetails = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfileDetails({}));
  }, []);

  useEffect(() => {
    if(profileDetails.error && profileDetails.error?.statusCode === 401) {
      localStorage.clear();
      dispatch(setLoggedIn(false));
      navigate("/login", { replace: true });
      resetState({})
    }
  }, [profileDetails])
  return (
    <>
      <Header />
      <div className="inner-wrapper">
        <Siderbar />
        <section role="main" className="content-body" >
          <Outlet />
          {children}
        </section>
      </div>
    </>
  );
}

export default Main;
