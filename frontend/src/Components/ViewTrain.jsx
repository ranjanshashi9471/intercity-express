export default function ViewTrain(props) {
	return (
		<div className="row my-5">
			{/* <h1>This is View Train Page.</h1> */}
			<div class="card text-start bg-opacity-75 bg-light">
				<h5 class="card-header">
					<span className="ms-1">Route no.-</span> {props.data.route_no}
					<span className="text-warning-emphasis">
						{" Route name- "}
						{props.data.route_name}{" "}
					</span>
					<span className="ms-1"> '{props.data.total_dist_km} KM'</span>
					<span className="ms-1">Total time- {props.data.time_taken} </span>
				</h5>
				<div class="card-body">
					<h5 class="card-title">
						<span>{props.data.station_code + " "}</span>
						<span>Train no-{" " + props.data.train_no} </span>
						<span className="text-primary-emphasis">
							{" Train name- "}
							{props.data.train_name}{" "}
						</span>
					</h5>
					<p class="card-text">
						<span className="text-success">
							ARRIVAL-
							<span>{" " + props.data.EAT}</span>
							<span>{" " + props.data.AAT}</span>{" "}
						</span>
						<span className="text-danger">
							DEPARTURE-
							<span>{" " + props.data.EDT}</span>
							<span>{" " + props.data.ADT}</span>
						</span>
					</p>
					{/* <a href="#" class="btn btn-primary">
						Go somewhere
					</a> */}
				</div>
			</div>
		</div>
	);
}
