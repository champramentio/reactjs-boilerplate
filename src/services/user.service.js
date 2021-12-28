import api from "./api";

class UserService {
	getUser(page) {
		return api.get(`/user?page=${page}`);
	}

	createUser(payload) {
		return api
			.post("/user", payload)
			.then(response => {
				if (response.data.error) throw new Error(response.data.error);

				return response.data;
			})
			.catch(error => {
				return { error: error.message };
			});
	}
}

export default new UserService();
