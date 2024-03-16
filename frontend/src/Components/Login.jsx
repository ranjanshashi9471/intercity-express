import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import login from "../images/login.png";
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
				<div className=" col-md-4 ms-auto my-4 p-4 bg-light rounded shadow bg-opacity-25 signin_form">
					<div className="m-3">
						<main class="form-signin w-100">
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
								<h1 class="h3 mb-3 fw-normal text-center">Please Signin</h1>

								<div class="form-floating">
									<input
										name="email"
										value={formData.email}
										onChange={handleChange}
										type="email"
										class="form-control"
										id="floatingInput"
										placeholder="name@example.com"
									/>
									<label for="floatingInput">Email address</label>
								</div>
								<div class="form-floating mt-2">
									<input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										class="form-control"
										id="floatingPassword"
										placeholder="Password"
									/>
									<label for="floatingPassword">Password</label>
								</div>
								<div class="form-floating mt-2">
									<select
										required
										class="form-control"
										name="userType"
										id="selectOptions"
										placeholder="Choose a User Type."
										onChange={handleChange}
										value={formData.userType}
									>
										<option value={"passengers"}>Passenger</option>
										<option value={"travel_agents"}>Agent</option>
										<option value={"staffs"}>Staff</option>
										<option value={"admin"}>Admin</option>
									</select>
									<label for="selectOptions">Type of user</label>
								</div>
								<div class="form-check text-start my-3 ms-1">
									<input
										class="form-check-input"
										type="checkbox"
										value="remember-me"
										id="flexCheckDefault"
									/>
									<label class="form-check-label" for="flexCheckDefault">
										Remember me
									</label>
								</div>
								<button class="btn btn-dark w-100 py-2" type="submit">
									Signin
								</button>
							</form>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
