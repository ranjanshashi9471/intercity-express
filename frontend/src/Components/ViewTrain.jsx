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
					<span className="ms-1">Total time- {props.data.journey_time} </span>
				</h5>
				<div className="card-body">
					<h5 className="card-title mb-0">
						<span>{props.data.train_no} </span>
						<span className="">{props.data.train_name} </span>
						<span> {props.data.start_stn + " "}</span>-{" "}
						<span>{props.data.end_stn + " "}</span>
						<span className="text-danger">{" " + props.data.depart_time}</span>
						<span className="text-success">{" - " + props.data.arr_time}</span>
					</h5>
				</div>
			</div>
		</div>
	);
}
