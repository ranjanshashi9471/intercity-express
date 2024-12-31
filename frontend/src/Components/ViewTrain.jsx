export default function ViewTrain(props) {
	return (
		<div className="row my-3">
			{/* <h1>This is View Train Page.</h1> */}
			<div className="card text-start bg-tertiary">
				<h5 className="card-header">
					<span>Route info: </span>
					{/* <span className="ms-1">{props.data.route_no} </span> */}
					<span className="text-warning-emphasis">
						{props.data.route_name}{" "}
					</span>
					<span className="ms-1"> '{props.data.total_dist_km} KM'</span>
					<span className="ms-1">Total time- {props.data.time_taken} </span>
				</h5>
				<div className="card-body">
					<h5 className="card-title">
						<span>{props.data.train_no} </span>
						<span className="">{props.data.train_name} </span>
						<span> {props.data.strtStn + " "}</span>-{" "}
						<span>{props.data.destStn + " "}</span>
						<span className="text-danger">
							{" "}
							DEPARTURE-
							<span>{" " + props.data.EDT}</span>
						</span>
						<span className="text-success">
							{" "}
							ARRIVAL-
							<span>{" " + props.data.EAT}</span>
						</span>
					</h5>

					<p className="card-text"></p>
				</div>
			</div>
		</div>
	);
}
