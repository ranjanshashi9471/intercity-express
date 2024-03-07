import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Register from "../Components/Register";

export default function Signup(props) {
	return (
		<div className="home-header">
			<Header />
			<Register setLoggedIn={props.setLoggedIn} />
			<Footer />
		</div>
	);
}
