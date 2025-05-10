//Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxHook";

function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const showNotificationMark = useAppSelector((state) => state.auth.showNotificationMark);

  const handleToogle = () => {
    setIsActive(!isActive);
    // Add or remove the class to the <html> tag based on isActive state
    if (isActive) {
      document.documentElement.classList.remove("sidebar-left-collapsed");
    } else {
      document.documentElement.classList.add("sidebar-left-collapsed");
    }
  };
  return (
    <aside id="sidebar-left" className="sidebar-left">
      <div className="sidebar-header d-none d-md-block" onClick={handleToogle}>
        <div className="sidebar-toggle d-none d-md-block">
          <i
            className="bx bx-menu"
            aria-label="Toggle sidebar"
            style={{ fontSize: "20px" }}
          ></i>
        </div>
      </div>
      <nav id="menu" className="nav-main navbarcontent" role="navigation">
        <ul className="nav nav-main">
          <li>
            <NavLink to="/" className="nav-link">
              <i className="bx bx-home-alt" aria-hidden="true" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-list" className="nav-link">
              <i className="bx bx-user" aria-hidden="true" />
              <span>Users</span>
            </NavLink>
          </li>


          <li>
            <NavLink to="/post-list" className="nav-link">
              <i className="bx bx-file-blank" aria-hidden="true" />
              <span>Posts</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/hashtag-list" className="nav-link">
              <i className="bx bx-file-blank" aria-hidden="true" />
              <span>Hashtag</span>
            </NavLink>
          </li>

          {/* <li>
            <NavLink to="/owner-list" className="nav-link">
              <i className="bx bx-user" aria-hidden="true" />
              <span>Business Owner Management</span>
            </NavLink>
          </li> */}

          {/* <li>
            <NavLink className="nav-link" to="/contact-us">
              <i className="bx bx-file-blank" aria-hidden="true" />
              <span>Contact Us</span>
            </NavLink>
          </li> */}

          {/* <li>
            <NavLink to="/service-request" className="nav-link">
              <i className="bx bx-info-square" aria-hidden="true" />
              <span>Service Request</span>
            </NavLink>
          </li> */}

          <li>
            <NavLink to="/cms-page" className="nav-link">
              <i className="bx bxs-contact" aria-hidden="true" />
              <span>CMS Page</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/notification" className="nav-link">
              <i className="bx bx-bell" aria-hidden="true" />
              <span>Notification</span>
            </NavLink>
          </li>


          {/* <li className="nav-item position-relative">
            <NavLink to="/notification" className="nav-link d-flex align-items-center">
              <i className="bx bx-bell" aria-hidden="true" />
              <span className="w-100">Notification</span>
              {showNotificationMark && <div className="ms-5 p-2 bg-danger border border-light rounded-circle border-0"></div>}
            </NavLink>

          </li> */}
          {/* <li>
            <NavLink to="/profile" className="nav-link">
              <i className="bx bx-user" aria-hidden="true" />
              <span>Profile</span>
            </NavLink>
          </li> */}
          {/* Add more NavLink to other routes */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
