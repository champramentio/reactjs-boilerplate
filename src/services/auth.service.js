import api from "./api";
import TokenService from "./token.service";

class AuthService {
	login(email, password) {
		return api
			.post("/login", {
				email,
				password
			})
			.then(response => {
				console.log("masuk auth service : login", response.data);
				if (response.data.error) throw new Error(response.data.error);

				//simpan token dan refresh
				TokenService.setUser(response.data.data);
				TokenService.setAccessToken(response.data.data.auth.token);
				TokenService.setRefreshToken(response.data.data.auth.refreshToken);

				return response.data;
			})
			.catch(error => {
				return { error: error.message };
			});
	}

	logout() {
		return api
			.post("/logout", {
				refresh_token: TokenService.getRefreshToken()
			})
			.then(response => {
				if (response.data.error) throw new Error(response.data.error);

				TokenService.removeAll();

				return response.data;
			})
			.catch(error => {
				return { error: error.message };
			});
	}

	register(name, email, password, retype_password) {
		return api.post("/register", {
			name,
			email,
			password,
			retype_password
		});
	}

	getCurrentUser() {
		return TokenService.getUser();
	}
}

export default new AuthService();
