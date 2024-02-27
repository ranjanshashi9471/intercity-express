import rail from "../images/rail.png";
import { NavLink } from "react-router-dom";
export default function Header(){
    return (
    <div className="">
        <nav className="all-header navbar navbar-expand-lg bg-transparent textbg-dark bg-gradient">
        <div className="container-fluid fs-4">
          <NavLink className="navbar-brand" to="/">
            <img className="" src={rail} alt="logo-img" width={"50"} />
            <strong className="fs-3 text-info-emphasis"> IET</strong>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Username
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="nav-link mx-1 py-0" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link mx-1 py-0" to="/signup">
                      Sign up
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1"></hr>
                  </li>
                  <li>
                    <NavLink className="nav-link mx-1 py-0" to="#">
                      Log out
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Rail Help
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    )
}