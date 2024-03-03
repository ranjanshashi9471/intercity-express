export default function SearchTrain() {
	let curr_date = new Date();
	return (
		<div className="row mt-3">
			<div className="col-lg-3 p-5 rounded mx-auto bg-light shadow bg-opacity-25 mt-5">
				<h3>Search for trains on Source and Destination</h3>
				<div>
					<form>
						<div class="form-floating mx-auto mb-2">
							<input
								type="text"
								class="form-control"
								id="floatingInput"
								placeholder="Station Code(From)"
							/>
							<label for="floatingInput">Enter boarding Stn code</label>
						</div>
						<div class="form-floating mx-auto mb-2">
							<input
								type="text"
								class="form-control"
								id="floatingInput"
								placeholder="Station Code(To)"
							/>
							<label for="floatingInput">Enter destination Stn code</label>
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
	);
}
