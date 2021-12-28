import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import User from "./components/User";
import Event from "./components/Event";
import Navbar from "./components/Navbar";
import AuthCheck from "./components/AuthCheck";

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
	const history = useHistory();
	if (!AuthCheck()) history.push("/login");

	return (
		<BrowserRouter>
			{AuthCheck() ? <Navbar /> : ""}

			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/user" component={User} />
				<Route path="/event" component={Event} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
