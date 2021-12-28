import { createSlice } from "@reduxjs/toolkit";
import TokenService from "../services/token.service";

const initialStateValue = () => {
	const exist = TokenService.getUser();
	return {
		id: (exist && exist.id) || "",
		name: (exist && exist.name) || ""
	};
};

export const userSlice = createSlice({
	name: "user",
	initialState: { value: initialStateValue() },
	reducers: {
		login: (state, action) => {
			state.value = action.payload;
		},

		logout: state => {
			state.value = initialStateValue();
		}
	}
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
