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

const fetchProductTypeDetails = () => {
	const URL = `${baseURL}getProductTypeDetails`;
	return axios.get(URL);
};

const insertProductDetails = (productId, productTypeId, productDate, productName, price) => {
	const URL = `${baseURL}postProductDetails`;
	return axios.post(URL, { productId, productTypeId, productDate, productName, price });
};

const fetchProductDetails = () => {
	const URL = `${baseURL}getProductDetails`;
	return axios.get(URL);
};

const insertPurchaseDetails = (
	purchaseId,
	productId,
	quantity,
	totalAmount,
	vendorName,
	modeOfTransaction,
	transactionId,
	purchaseDate,
) => {
	const URL = `${baseURL}postPurchaseDetails`;
	return axios.post(URL, {
		purchaseId,
		productId,
		quantity,
		totalAmount,
		vendorName,
		modeOfTransaction,
		transactionId,
		purchaseDate,
	});
};

const fetchPurchaseDetails = () => {
	const URL = `${baseURL}getPurchaseDetails`;
	return axios.get(URL);
};

const insertSalesDetails = (
	salesId,
	productId,
	quantity,
	totalAmount,
	customerName,
	salesDate,
	customerType,
	modeOfTransaction,
	transactionId,
) => {
	const URL = `${baseURL}postSalesDetails`;
	return axios.post(URL, {
		salesId,
		productId,
		quantity,
		totalAmount,
		customerName,
		salesDate,
		customerType,
		modeOfTransaction,
		transactionId,
	});
};

const fetchSalesDetails = () => {
	const URL = `${baseURL}getSalesDetails`;
	return axios.get(URL);
};

export default {
	fetchUserDetails,
	updatePasswordDetails,
	fetchProductTypeDetails,
	insertProductDetails,
	fetchProductDetails,
	insertPurchaseDetails,
	fetchPurchaseDetails,
	insertSalesDetails,
	fetchSalesDetails,
};
