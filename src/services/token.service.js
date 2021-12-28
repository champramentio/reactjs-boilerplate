class TokenService {
	getAccessToken() {
		return localStorage.getItem("token");
	}

	setAccessToken(token) {
		localStorage.setItem("token", token);
	}

	getRefreshToken() {
		return localStorage.getItem("refreshToken");
	}
	setRefreshToken(refreshToken) {
		localStorage.setItem("refreshToken", refreshToken);
	}

	getUser() {
		return JSON.parse(localStorage.getItem("user"));
	}

	getName() {
		return this.getUser().name;
	}

	setUser(data) {
		localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name }));
	}

	removeAll() {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
	}
}

export default new TokenService();
