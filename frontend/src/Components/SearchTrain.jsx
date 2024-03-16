import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ViewTrain from "./ViewTrain";

export default function SearchTrain() {
	let curr_date = new Date();
	const [searchData, setSearchData] = useState({
		startStn: "",
		endStn: "",
		date: "",
	});

	let [trainData, setTrainData] = useState([]);

	async function handleSubmit(event) {
		event.preventDefault();
		await axios
			.post("/searchtrain", {
				method: "cors",
				data: searchData,
			})
			.then((res) => {
				if (res.data.message === "Success") {
					toast.success("Success!!");
					setTrainData(res.data.trainData);
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {});
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setSearchData((prev) => {
			return { ...prev, [name]: value };
		});
	}

	return (
		<div className="row mt-3">
			<div className="col-lg-4 mx-auto">
				<div className="col-lg-12 p-5 rounded bg-light shadow bg-opacity-50 mt-5">
					<h3>Search for trains Between Stations.</h3>
					<div>
						<form onSubmit={handleSubmit}>
							<div class="form-floating mx-auto mb-2">
								<input
									type="text"
									class="form-control"
									id="floatingInput"
									placeholder="Station Code(From)"
									value={searchData.startStn}
									onChange={handleChange}
									name="startStn"
								/>
								<label for="floatingInput">Enter Stn code</label>
							</div>
							<div class="form-floating mx-auto mb-2">
								<input
									type="text"
									class="form-control"
									id="floatingInput"
									placeholder="Station Code(To)"
									value={searchData.endStn}
									onChange={handleChange}
									name="endStn"
								/>
								<label for="floatingInput">Enter Stn code</label>
							</div>
							<div class="form-floating mx-auto mb-2">
								<input
									type="date"
									class="form-control"
									id="floatingInput"
									value={curr_date.toLocaleDateString("fr-CA")}
								/>
								<label for="floatingInput">Choose DOJ</label>
							</div>
							<button class="btn btn-dark w-100 py-2" type="submit">
								Find Trains
							</button>
						</form>
					</div>
				</div>
			</div>
			{trainData.length > 0 ? (
				<div className="col-lg-6 mx-auto">
					{trainData.map((train, index) => {
						return <ViewTrain key={index} data={train} />;
					})}
				</div>
			) : (
				""
			)}
		</div>
	);
}
