import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../images/add-user.png";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Register() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: "passengers",
		name: "",
		gender: "male",
		age: 0,
		contact_no: "",
		residence_city: "",
	});
	const navigate = useNavigate();

	function handleChange(event) {
		const { value, name } = event.target;
		setFormData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	async function handleSubmit() {
		await axios
			.post("/signup", {
				mode: "cors",
				data: formData,
			})
			.then((res) => {
				if (res.data === "success") {
					toast.success("Success");
					navigate("/login");
				} else if (res.data === "userexists!") {
					toast.error("User Already Registered");
				} else {
					toast.error("Server Error!!");
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error("Request Failed!");
			});
	}

	return (
		<div>
			<div className="row mx-5 mt-4">
				<div className=" col-lg-5 ms-auto bg-dark border rounded shadow bg-opacity-50 signin_form">
					<div className="px-4 my-4">
						<main class="form-signin w-100">
							<form
								onSubmit={(event) => {
									event.preventDefault();
									handleSubmit();
								}}
							>
								<div className="">
									<img
										className="mb-2"
										src={login}
										alt=""
										width="72"
										height="57"
									/>
								</div>

								<h1 class="h3 mb-3 fw-normal text-warning">Please Signup</h1>
								<div class="form-floating mb-3">
									<select
										required
										class="form-control"
										name="userType"
										value={formData.userType}
										onChange={handleChange}
										id="selectOptions"
										placeholder="Choose a User Type."
									>
										<option value={"passengers"}>Passenger</option>
										<option value={"travel_agents"}>Agent</option>
										{/* <option value={"staffs"}>Staff</option> */}
									</select>
									<label for="selectOptions">Type of user</label>
								</div>
								<div class="form-floating">
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										class="form-control"
										id="floatingName"
										placeholder="Your name here"
									/>
									<label htmlfor="floatingName">Name</label>
								</div>

								<div className="row mt-3">
									<div className="col-md-6 me-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="gender">
												Gender<sup className="text-danger">*</sup>
											</label>
											<select
												required
												class="form-control"
												name="gender"
												value={formData.gender}
												onChange={handleChange}
												id="gender"
												placeholder="Your Gender."
											>
												<option value={"male"}>Male</option>
												<option value={"female"}>Female</option>
												<option value={"others"}>Others</option>
											</select>
											{/* <label for="selectGender">Gender</label> */}
										</div>
									</div>

									<div className="col-md-6 mt-1 ms-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="age">
												Age<sup className="text-danger">*</sup>
											</label>

											<input
												type="number"
												name="age"
												id="age"
												placeholder="Enter your Last name"
												className="form-control"
												onChange={handleChange}
												value={formData.age}
												required
											/>
										</div>
									</div>
								</div>
								<div className="row mt-3">
									<div className="col-md-6 me-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="residence">
												Residence City<sup className="text-danger">*</sup>
											</label>

											<input
												type="text"
												name="residence_city"
												id="residence"
												placeholder="Enter your residence city"
												className="form-control"
												onChange={handleChange}
												value={formData.residence_city}
												required
											/>
										</div>
									</div>

									<div className="col-md-6 mt-1 ms-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="contact">
												Contact no<sup className="text-danger">*</sup>
											</label>

											<input
												type="number"
												name="contact_no"
												id="contact"
												placeholder="10 Digit contact no"
												className="form-control"
												onChange={handleChange}
												value={formData.contact_no}
												pattern="[1-9]{1}[0-9]{9}"
												required
											/>
										</div>
									</div>
								</div>

								<div class="form-floating mt-3">
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										class="form-control"
										id="floatingInput"
										placeholder="name@example.com"
									/>
									<label for="floatingInput">Email address</label>
								</div>
								<div class="form-floating mt-3">
									<input
										name="password"
										value={formData.password}
										onChange={handleChange}
										type="password"
										class="form-control"
										id="floatingPassword"
										placeholder="Password"
									/>
									<label for="floatingPassword">Password</label>
								</div>

								<div className="mt-3">
									<button class="btn btn-success w-100 py-2" type="submit">
										Signup
									</button>
									<div className="row mx-auto mt-1">
										<div className="col-lg-4 text-light">
											<hr></hr>
										</div>
										<div className="col-lg-4 mt-1">
											<p className="text-warning">Already registered</p>
										</div>
										<div className="col text-light">
											<hr></hr>
										</div>
									</div>
									<NavLink
										className="btn btn-outline-light w-100 py-2"
										to="/login"
									>
										Signin
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
