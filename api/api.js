import axios from 'axios';

const baseURL = `http://localhost:8080/`;

const fetchUserDetails = () => {
	const URL = `${baseURL}UserDetails`;
	return axios.get(URL);
};

export default {
	fetchUserDetails,
};
