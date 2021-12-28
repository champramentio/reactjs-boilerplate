import { useSelector } from "react-redux";

const AuthCheck = () => {
	const userState = useSelector(state => state.user.value);

	return userState.id ? true : false;
};

export default AuthCheck;
