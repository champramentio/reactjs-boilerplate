import axios from "axios";
import TokenService from "./token.service";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";

const baseURL = env.BASE_API_URL;
const timeout = 16000;

const instance = axios.create({
	baseURL,
	timeout,
	headers: {
		"Content-Type": "application/json"
	}
});

instance.interceptors.request.use(
	async config => {
		let token = TokenService.getAccessToken();
		let refreshToken = TokenService.getRefreshToken();

		if (token) {
			//coba decode untuk cek expired
			const { exp } = jwt_decode(token);

			//jika refresh token sudah mau expired
			if (exp - Date.now() / 1000 < 60) {
				try {
					const result = await axios({
						url: `${baseURL}/refresh_token`,
						method: "post",
						headers: {
							Authorization: `Bearer ${token}`
						},
						data: {
							refresh_token: refreshToken
						}
					});
					if (result.data.error) throw new Error(result.data.error);
					console.log("refresh token updated", result.data);

					token = result.data.data.token;
					refreshToken = result.data.data.refreshToken;
					TokenService.setAccessToken(token);
					TokenService.setRefreshToken(refreshToken);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}

		//return config;
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default instance;
