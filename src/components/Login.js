import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import { toast, modal } from "../services/modal";

//state management
import { useDispatch } from "react-redux";
import { login } from "../features/user";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const dispatch = useDispatch();

	const Auth = async e => {
		e.preventDefault();
		try {
			AuthService.login(email, password).then(result => {
				if (result.error) {
					modal("error", "error", result.error);
					return;
				}

				//update context
				dispatch(login({ id: result.data.id, name: result.data.name }));

				toast("success", result.success);
				history.push("/user");
			});
		} catch (error) {
			if (error.message) modal("error", "error", error.message);
		}
	};

	return (
		<section className="hero has-background-grey-lighter is-fullheight is-fullwidth">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4-desktop">
							<form onSubmit={Auth} className="box">
								<h1 className="title has-text-centered">Login</h1>
								<div className="field mt-5">
									<label className="label">Email</label>
									<div className="controls">
										<input type="text" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
									</div>
								</div>
								<div className="field mt-5">
									<label className="label">Password</label>
									<div className="controls">
										<input type="password" className="input" placeholder="******" value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" />
									</div>
								</div>
								<div className="field mt-5">
									<button className="button is-success is-fullwidth">Login</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
