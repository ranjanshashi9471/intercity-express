import rail from "../images/rail.png";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import HeaderLogin from "./HeaderLogin";
export default function Header(props) {
	return (
		<div className="">
			{/* <div class="position-absolute z-0 w-100">
				<img
					src="https://images.pexels.com/photos/1793503/pexels-photo-1793503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt="pict"
					width="100%"
				/>
			</div> */}
			<nav className="navbar navbar-expand-lg">
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
							<li className="nav-item">
								<NavLink className="nav-link" to="#">
									Rail Help
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
									Account
									{/* {props.loggedIn ? props.serverUserData.name : "Username"} */}
								</a>
								<ul className="dropdown-menu">
									{props.loggedIn ? (
										<Logout
											setLoggedIn={props.setLoggedIn}
											name={props.serverUserData.name}
										/>
									) : (
										<HeaderLogin />
									)}
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
