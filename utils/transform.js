import moment from 'moment';

const transformProductType = data => {
	return (
		data &&
		data.map(item => {
			return {
				text: item.productType,
				value: item.productTypeId,
			};
		})
	);
};

const transformProductDetails = (pdData, pdTypeData) => {
	return (
		pdData &&
		pdData.map(item => {
			return {
				pId: item.productId,
				pType: pdTypeData && pdTypeData.find(data => data.value === item.productTypeId).text,
				pName: item.productName,
				pDate: moment(item.productDate).format('DD-MMM-YYYY'),
				price: item.price,
			};
		})
	);
};

const transformFilterProduct = data => {
	return (
		data &&
		data.map(item => {
			return {
				text: item.productName,
				value: item.productId,
			};
		})
	);
};

export default {
	transformProductType,
	transformProductDetails,
	transformFilterProduct,
};
