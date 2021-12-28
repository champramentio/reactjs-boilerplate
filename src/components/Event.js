/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import EventService from "../services/event.service";
import { modal } from "../services/modal";

const Event = () => {
	const [events, setEvents] = useState([]);

	useEffect(async () => {
		await getEvents();
	}, []);

	const getEvents = async () => {
		const list = await EventService.getEvent();

		if (list.data.error) modal("error", "error", list.data.error);
		else setEvents(list.data.data);
	};

	return (
		<div className="container mt-4">
			<button onClick={getEvents} className="button is-primary">
				Get Events
			</button>
			<h1>Manage Events</h1>
			<table className="table is-striped is-fullwidth mt-4">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Location</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{events.length > 0 &&
						events.map((row, index) => (
							<tr key={row.event_id}>
								<td>{index + 1}</td>
								<td>{row.event_name}</td>
								<td>{row.event_location}</td>
								<td>{row.event_approve_status_name}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Event;
