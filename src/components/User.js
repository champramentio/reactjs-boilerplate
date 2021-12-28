/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { modal, toast } from "../services/modal";
import UserForm from "./UserForm";
import Pagination from "./Pagination";

const User = () => {
	const [currentPaginate, setCurrentPaginate] = useState({ last_page: 1, page: 1, per_page: 15, total: 0 });

	const formInit = {
		name: "",
		email: "",
		password: "",
		retype_password: ""
	};

	const [list, setList] = useState([]);
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState(formInit);

	useEffect(async () => {
		await getList();
	}, []);

	useEffect(
		async () => {
			console.log("formData", formData);
		},
		[formData]
	);

	const getList = async (page = 1) => {
		const result = await UserService.getUser(page);

		if (result.data.error) {
			modal("error", "error", result.data.error);
			return;
		}

		setList(result.data.data);
		setCurrentPaginate({
			last_page: result.data.last_page,
			page: result.data.page,
			per_page: result.data.per_page,
			total: result.data.total
		});
	};

	const onSave = async () => {
		if (!isValidated()) return;

		const result = await UserService.createUser(formData);
		if (result.error) {
			modal("error", "error", result.error);
			return;
		}

		//jika berhasil
		toast("success", result.success);
		getList();
		handleClose();
		setFormData(formInit);
	};

	const isValidated = () => {
		if (formData.password !== formData.retype_password) {
			modal("error", "error", "Password doesn't match");
			return false;
		}
		return true;
	};

	const onChange = async e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<div className="container mt-4">
			<button onClick={getList} className="button is-primary">
				Get Users
			</button>
			<button onClick={handleShow} className="button is-primary">
				Create Users
			</button>
			<h1>Manage Users</h1>
			<table className="table is-striped is-fullwidth mt-4">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th className="has-text-centered">Action</th>
					</tr>
				</thead>
				<tbody>
					{list &&
						list.length > 0 &&
						list.map(user => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.active_user_status_name}</td>
								<td data-label="Action" className="has-text-centered">
									<div className="dropdown is-left is-hoverable">
										<div className="dropdown-trigger">
											<button className="button is-primary is-small" aria-haspopup="true" aria-controls="dropdown-menu">
												<span className="icon is-small">•••</span>
											</button>
										</div>
										<div className="dropdown-menu" id="dropdown-menu" role="menu">
											<div className="dropdown-content">
												<a href="#!" className="dropdown-item">
													Detail
												</a>
												<hr className="dropdown-divider" />
												<a href="#!" className="dropdown-item">
													Link
												</a>
											</div>
										</div>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>

			<Pagination
				className="pagination-bar"
				currentPage={currentPaginate.page}
				totalCount={currentPaginate.total}
				pageSize={currentPaginate.per_page}
				onPageChange={page => {
					getList(page);
				}}
			/>
			<br />

			<UserForm show={show} handleClose={handleClose} data={formData} onChange={onChange} onSave={onSave} />
		</div>
	);
};

export default User;
