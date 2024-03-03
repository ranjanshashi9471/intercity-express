import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Home() {
	return (
		<div className="bg-primary home-header">
			<Header />
			<div className="fw-bold">
				<h1>This is Home Page.</h1>
			</div>
			<Footer />
		</div>
	);
}
