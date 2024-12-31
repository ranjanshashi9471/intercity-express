import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import login from "../images/log-in.png";
import axios from "axios";

export default function Login(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: "passengers",
	});

	// const [data, setData] = useState([]);
	const navigate = useNavigate();

	function handleChange(event) {
		const { value, name } = event.target;
		setFormData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	async function handleSubmit() {
		await axios
			.post("/login", {
				mode: "cors",
				data: formData,
			})
			.then((res) => {
				if (res.data.message === "passwordmismatch") {
					toast.error("Wrong Password");
				} else if (res.data.message === "usernotfound") {
					toast.error("Unregistered User");
				} else if (res.data.message === "errorcheckinguser") {
					toast.error("Db error");
				} else {
					toast.success("Loggedin");
					props.setLoggedIn(true);
					// const { id, name, email, userType } = res.data.userData;
					console.log(res.data.userData);
					props.setServerUserData(res.data.userData);
					navigate("/dashboard");
				}
			})
			.catch((err) => {
				// toast.error(err);
				console.log(err);
			});
	}

	return (
		<div className="text-dark">
			<div className="row m-3 mt-5">
				{/* <div className="col-lg-5 me-auto"></div> */}
				<div className=" col-md-4 ms-auto my-4 p-4 bg-secondary rounded shadow bg-opacity-50 signin_form">
					<div className="m-3">
						<main className="form-signin w-100">
							<form
								id="loginform"
								onSubmit={(event) => {
									event.preventDefault();
									handleSubmit();
								}}
							>
								<img
									className="mb-4"
									src={login}
									alt=""
									width="72"
									height="57"
								/>
								<h1 className="h3 mb-3 fw-normal text-warning">
									Please Signin
								</h1>

								<div className="form-floating mb-3">
									<select
										required
										className="form-control"
										name="userType"
										id="selectOptions"
										placeholder="Choose a User Type."
										onChange={handleChange}
										value={formData.userType}
									>
										<option value={"passengers"}>Passenger</option>
										<option value={"travel_agents"}>Agent</option>
										<option value={"staffs"}>Staff</option>
										{/* <option value={"admin"}>Admin</option> */}
									</select>
									<label for="selectOptions">Type of user</label>
								</div>

								<div className="form-floating mb-3">
									<input
										name="email"
										value={formData.email}
										onChange={handleChange}
										type="email"
										className="form-control"
										id="floatingInput"
										placeholder="name@example.com"
									/>
									<label for="floatingInput">Email address</label>
								</div>
								<div className="form-floating mt-3">
									<input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="form-control"
										id="floatingPassword"
										placeholder="Password"
									/>
									<label for="floatingPassword">Password</label>
								</div>

								{/* <div className="form-check text-start my-3 ms-1">
									<input
										className="form-check-input"
										type="checkbox"
										value="remember-me"
										id="flexCheckDefault"
									/>
									<label className="form-check-label" for="flexCheckDefault">
										Remember me
									</label>
								</div> */}
								<div className="mt-3">
									<button className="btn btn-success w-100 py-2" type="submit">
										Signin
									</button>
									<div className="row mx-auto mt-1">
										<div className="col">
											<hr></hr>
										</div>
										<div className="col">
											<p className="text-light">New user</p>
										</div>
										<div className="col">
											<hr></hr>
										</div>
									</div>

									<NavLink className="btn btn-dark w-100 py-2" to="/signup">
										Signup
									</NavLink>
								</div>
							</form>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
