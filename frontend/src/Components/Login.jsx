import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import login from "../images/login.png";

export default function Loginin(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: "",
	});

	const [data, setData] = useState([]);
	const navigate = useNavigate();

	function handleChange(event) {
		const { value, name } = event.target;
		setFormData((prevData) => {
			return { ...prevData, [name]: value };
		});
		// console.log(formData);
	}

	async function handlePostRequest() {
		await fetch("/", {
			accept: "application/json",
		})
			// .then((res) => res.text())
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
		console.log(data);
		// const response = await fetch("http://localhost:5000/login", {
		// 	method: "post",
		// 	mode: "cors",
		// 	body: JSON.stringify(formData),
		// });
		// if (response) {
		// 	props.setLoggedIn(true);
		// 	toast.success("LoggedIn");
		// 	navigate("/dashboard");
		// } else {
		// 	toast.error("Error logging in");
		// 	props.setLoggedIn(false);
		// 	navigate("/login");
		// }
	}

	return (
		<div className="">
			<div className="row m-3">
				{/* <div className="col-lg-5 me-auto"></div> */}
				<div className=" col-lg-4 mx-auto my-4 bg-light rounded shadow bg-opacity-25 signin_form">
					<div className="m-3">
						<main class="form-signin w-100">
							<form
								onSubmit={(event) => {
									event.preventDefault();
									handlePostRequest();
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
									>
										<option value={"passenger"}>Passenger</option>
										<option value={"agent"}>Agent</option>
										<option value={"admin/root"}>Admin/Root</option>
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
