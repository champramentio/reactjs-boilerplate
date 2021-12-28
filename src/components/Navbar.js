import React from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { toast } from "../services/modal";

//state management
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";

const Navbar = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const userState = useSelector(state => state.user.value);

	const Logout = async () => {
		try {
			const result = await AuthService.logout();
			toast("success", result.success);

			//update context
			dispatch(logout());

			history.push("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="navbar is-light" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="navbar-brand">
					<a className="navbar-item" href="https://bulma.io">
						<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
					</a>

					<Link to="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</Link>
				</div>

				<div id="navbarBasicExample" className="navbar-menu">
					<div className="navbar-start">
						<Link to="/user" className="navbar-item">
							User
						</Link>
						<Link to="/event" className="navbar-item">
							Event
						</Link>
					</div>

					<div className="navbar-end">
						<div className="navbar-item">
							<div>{userState.name}</div>
							<div className="buttons">
								<button onClick={Logout} className="button is-light">
									Log Out
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
