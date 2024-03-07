import "./App.css";
import Signin from "./Pages/Signin";
import NotFound from "./Components/NotFound";
import MainHeader from "./Components/MainHeader";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import { useState } from "react";
import Signup from "./Pages/Signup";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [serverUserData, setServerUserData] = useState({
		name: "",
		email: "",
		userType: "",
	});

	return (
		<div>
			{/* <Header setLoggedIn={setLoggedIn} /> */}

			<Routes>
				<Route path="/" element={<MainHeader />}>
					<Route index element={<Home />} />
					<Route path="/login" element={<Signin setLoggedIn={setLoggedIn} />} />
					<Route
						path="/signup"
						element={<Signup setLoggedIn={setLoggedIn} />}
					/>
					<Route path="*" element={<NotFound />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute loggedIn={loggedIn}>
								<Dashboard />
							</PrivateRoute>
						}
					/>
				</Route>
			</Routes>

			{/* <Footer /> */}
		</div>
	);
}

export default App;
