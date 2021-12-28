/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";

const UserForm = props => {
	return (
		<div className={props.show ? "modal is-active" : "modal"}>
			<div className="modal-background" />
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">User Form</p>
					<button className="delete" aria-label="close" onClick={props.handleClose} />
				</header>
				<section className="modal-card-body">
					<div className="field">
						<label htmlFor="username" className="label">
							Nama
						</label>
						<div className="control">
							<input className="input" type="text" placeholder="masukkan nama" value={props.data.name} name="name" onChange={props.onChange} />
						</div>
					</div>
					<div className="field">
						<label htmlFor="useremail" className="label">
							Email
						</label>
						<div className="control">
							<input className="input" type="text" placeholder="masukkan email" value={props.data.email} name="email" onChange={props.onChange} />
						</div>
					</div>
					<div className="field">
						<p>Jika password tidak diisi maka pengguna akan dikirimkan password oleh sistem secara otomatis</p>
						<label htmlFor="password1" className="label">
							Password
						</label>
						<div className="control">
							<input className="input" type="password" placeholder="masukkan password" value={props.data.password} name="password" onChange={props.onChange} />
						</div>
					</div>
					<div className="field">
						<label htmlFor="password2" className="label">
							Re-type Password
						</label>
						<div className="control">
							<input className="input" type="password" placeholder="ketik ulang password" value={props.data.retype_password} name="retype_password" onChange={props.onChange} />
						</div>
					</div>
				</section>
				<footer className="modal-card-foot">
					<button className="button is-primary" onClick={props.onSave}>
						Save
					</button>
					<button className="button" onClick={props.handleClose}>
						Cancel
					</button>
				</footer>
			</div>
		</div>
	);
};

export default UserForm;
