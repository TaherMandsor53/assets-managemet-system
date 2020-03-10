import axios from 'axios';

const baseURL = `http://localhost:8080/api/`;

const fetchUserDetails = () => {
	const URL = `${baseURL}UserDetails`;
	return axios.get(URL);
};

const updatePasswordDetails = password => {
	const URL = `${baseURL}UserDetails/passUpdate`;
	return axios.put(URL, { password });
};

export default {
	fetchUserDetails,
	updatePasswordDetails,
};
