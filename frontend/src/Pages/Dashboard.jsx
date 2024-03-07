import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SearchTrain from "../Components/SearchTrain";

export default function Dashboard() {
	return (
		<div className="home-header">
			<Header />
			<SearchTrain />
			<Footer />
		</div>
	);
}
