import { NavLink, useNavigate } from "react-router-dom";
import login from "../images/add-user.png";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Register() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({});

	const navigate = useNavigate();

	async function onSubmit(formData) {
		console.log(formData);
		try {
			const response = await axios.post("/Auth/register", formData, {
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
			if (!response.data.success) {
				toast.error(response.data.message);
			} else {
				toast.success(response.data.message);
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
			toast.error("Error Sending Request!!");
		}
	}

	return (
		<div>
			<div className="row mx-5">
				<div className=" col-lg-5 ms-auto border rounded shadow bg-light signin_form">
					<div className="px-4">
						<main className="form-signin w-100 my-3">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="">
									<img
										className="mb-2"
										src={login}
										alt=""
										width="72"
										height="57"
									/>
								</div>

								<h1 className="h3 mb-2 fw-normal text-warning">
									Please Signup
								</h1>
								<div className="form-floating mb-3">
									<select
										required
										className="form-control"
										id="selectOptions"
										placeholder="Choose a User Type."
										{...register("userType", { required: true })}
									>
										<option value={"passengers"}>Passenger</option>
										{/* <option value={"travel_agents"}>Agent</option> */}
										{/* <option value={"staffs"}>Staff</option> */}
									</select>
									<label for="selectOptions">Type of user</label>
								</div>
								<div className="form-floating">
									<input
										type="text"
										className="form-control"
										id="floatingName"
										placeholder="Your name here"
										{...register("name", {
											required: true,
											minLength: { value: 3, message: "Min Lenngth is 3" },
											maxLength: { value: 20, message: "Max Length is 20" },
										})}
									/>
									<label htmlfor="floatingName">Name</label>
									{errors.name && (
										<p className="text-danger">{errors.name.message}</p>
									)}
								</div>

								<div className="row mt-3">
									<div className="col-md-6 me-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="gender">
												Gender<sup className="text-danger">*</sup>
											</label>
											<select
												required
												className="form-control"
												id="gender"
												placeholder="Your Gender."
												{...register("gender", { required: true })}
											>
												<option value={"male"}>Male</option>
												<option value={"female"}>Female</option>
												<option value={"others"}>Others</option>
											</select>
										</div>
									</div>

									<div className="col-md-6 mt-1 ms-auto">
										<div className="form-control">
											<label className="form-label" htmlFor="age">
												Age<sup className="text-danger">*</sup>
											</label>

											<input
												required
												type="number"
												id="age"
												placeholder="Enter your age"
												className="form-control"
												{...register("age")}
											/>
										</div>
									</div>
								</div>
								{/* <div className="row mt-3">
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
								</div> */}

								<div className="form-floating mt-2">
									<input
										type="email"
										className="form-control"
										id="floatingInput"
										placeholder="name@example.com"
										{...register("email", {
											required: true,
											pattern: {
												value:
													/^[^\.\s][\w\-_.]*[^\.\s]@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
												message: "Not a Valid Email",
											},
										})}
									/>
									<label for="floatingInput">Email address</label>
									{errors.email && (
										<p className="text-danger">{errors.email.message}</p>
									)}
								</div>
								<div className="form-floating mt-3">
									<input
										type="password"
										className="form-control"
										id="floatingPassword"
										placeholder="Password"
										{...register("password", {
											required: true,
											minLength: { value: 7, message: "Min length 7" },
											maxLength: { value: 15, message: "Max Length 15" },
										})}
									/>
									<label for="floatingPassword">Password</label>
									{errors.password && (
										<p className="text-danger">{errors.password.message}</p>
									)}
								</div>

								<div className="mt-3">
									<button className="btn btn-success w-100 py-2" type="submit">
										Signup
									</button>
									<p className="text-warning mt-2">Already registered</p>
									<NavLink className="btn btn-dark w-100 py-2" to="/login">
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
