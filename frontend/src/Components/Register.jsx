import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../images/add-user.png";
import { toast } from "react-hot-toast";

export default function Register(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: "passenger",
		name: "",
		gender: "",
		age: 0,
	});
	const navigate = useNavigate();

	function handleChange(event) {
		const { value, name } = event.target;
		setFormData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	return (
		<div>
			<div className="row my-5 mx-5">
				{/* <div className="col-lg-5 me-auto"></div> */}
				<div className=" col-lg-4 mx-auto bg-light my-5 rounded shadow bg-opacity-25 signin_form">
					<div className="m-5">
						<main class="form-signin w-100">
							<form
								onSubmit={(event) => {
									event.preventDefault();
									props.setLoggedIn(true);
									toast.success("Account Created");
									navigate("/dashboard");
								}}
							>
								<img
									className="mb-2"
									src={login}
									alt=""
									width="72"
									height="57"
								/>
								<h1 class="h3 mb-3 fw-normal text-center">Please Signup</h1>
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

								<div className="row mt-2">
									<div className="col-md-6 me-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="gender">
												Gender<sup className="text-danger">*</sup>
											</label>
											<select
												required
												class="form-control"
												name="userType"
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

									<div className="col-md-6 ms-auto">
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

								<div class="form-floating mt-2">
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
								<div class="form-floating mt-2">
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
								<div class="form-floating mt-2">
									<select
										required
										class="form-control"
										name="userType"
										value={formData.userType}
										onChange={handleChange}
										id="selectOptions"
										placeholder="Choose a User Type."
									>
										<option value={"passenger"}>Passenger</option>
										<option value={"agent"}>Agent</option>
										<option value={"admin"}>Admin</option>
									</select>
									<label for="selectOptions">Type of user</label>
								</div>
								{/* <div class="form-check text-start my-3 ms-1">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="remember-me"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                  </label>
                </div> */}
								<button class="btn btn-dark w-100 py-2 mt-3" type="submit">
									Signup
								</button>
							</form>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
