import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouteConfig,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Home/Dashboard/Dashboard";
import Main from "./pages/Main";
import ContactUs from "./pages/Home/ContactUs/ContactUs";
import DisputeRequest from "./pages/Home/DisputeRequest/DisputeRequest";
import Profile from "./pages/Home/Profile/Profile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Otp from "./pages/Auth/Otp";
import { useAppSelector } from "./redux/reduxHook";
import Notification from "./pages/Home/Notification/Notification";
import ResetPassword from "./pages/Auth/ResetPassword";
import RequestService from "./pages/Home/Service/RequestService";
import { Loader } from "./component/Loader";
import ViewUser from "./pages/Home/User/ViewUser";
import PostList from "./pages/Home/Posts/PostList";
import PostView from "./pages/Home/Posts/PostView";
import HashtagList from "./pages/Home/Hashtag/HashtagList";
import HashtagView from "./pages/Home/Hashtag/HashtagView";
import UserList from "./pages/Home/User/UserList";

const Login = lazy(() => import("./pages/Auth/Login"));

const Routes: React.FC = () => {
  // const { isLoggedIn } = useAppSelector((state) => state.auth);
  const isLoggedIn = false

  // Add a loading state to ensure isLoggedIn is fully determined
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Simulate an async check for auth state (e.g., fetching from localStorage or an API)
    // In real code, you should check and set isLoggedIn properly here
    // if (isLoggedIn !== undefined) {
    //   setLoading(false);
    // }
    setLoading(false);
  }, [isLoggedIn]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <RouteConfig>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/otp"
            // element={isLoggedIn ? <Navigate to="/" /> : <Otp />}
            element={<Otp />}
          />
          <Route
            path="/login"
            // element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            element={<Login />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/"
            // element={isLoggedIn ? <Main /> : <Navigate to="/login" />}
            element={<Main />}
          >
            <Route index={true} element={<Dashboard />} />
            <Route path="user-list" >
              <Route index={true} element={<UserList />} />
              <Route path=":id" element={<ViewUser />} />
            </Route>
            <Route path="post-list" >
              <Route index={true} element={<PostList />} />
              <Route path=":id" element={<PostView />} />
            </Route>
            <Route path="hashtag-list" >
              <Route index={true} element={<HashtagList />} />
              <Route path=":id" element={<HashtagView />} />
            </Route>
            <Route path="dispute-request" element={<DisputeRequest />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notification" element={<Notification />} />
            {/* <Route path="service-request" element={<RequestService />} /> */}
          </Route>
        </RouteConfig>
      </Suspense>
    </Router >
  );
};

export default Routes;
