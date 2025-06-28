// Login.tsx
import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxHook";
import { setLoggedIn } from "../redux/slice/Auth";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profileDetails = useAppSelector((state) => state.auth.profileDetails);
  const [showDropDown, setShowDropDown] = React.useState(false);


  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLoggedIn(false));
    navigate("/login", { replace: true });
  };

  const getProfileImage = () => {
    return <img
      src={profileDetails.avatar ||
        'https://avatar.iran.liara.run/public/boy?username=Ash'}
      alt="Testing"
      className="rounded-circle"
      data-lock-picture="img/!logged-user.jpg"
    />
  };

  if (Object.keys(profileDetails).length === 0) return null;

  return (
    <header className="header">
      <div className="logo-container">
        <Link className="logo" to="/" >
          <h3 style={{ marginLeft: '5px' }}>Eyes On the Sky</h3>
        </Link>

        <div
          className="d-md-none toggle-sidebar-left"
          data-toggle-class="sidebar-left-opened"
          data-target="html"
          data-fire-event="sidebar-left-opened"
        >
          <i className="fas fa-bars" aria-label="Toggle sidebar" />
        </div>
      </div>
      {/* start: search & user box */}
      <div className="header-right">
        <span className="separator" />
        <div
          id="userbox"
          className="userbox"
          onClick={() => setShowDropDown(!showDropDown)}
          style={{ cursor: "pointer" }}
        >
          <a className={showDropDown ? "show" : ""}>
            <figure className="profile-picture">{getProfileImage()}</figure>
            <div className="profile-info">
              <span className="name">
                Welcome, {profileDetails?.first_name}
              </span>
            </div>
            <i className="bx bxs-chevron-down" />
          </a>
          <div className={`dropdown-menu ${showDropDown ? "show" : ""}`}>
            <ul className="list-unstyled mb-2">
              <li className="divider" />
              <li>
                <a role="menuitem" onClick={() => handleLogout()}>
                  <i className="bx bx-power-off" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* end: search & user box */}
    </header>
  );
}

export default Header;
