import moment from 'moment';
import PurchaseDetails from '../components/purchase-details/PurchaseDetails';

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

const transformPurchaseDetails = (purDetails, proDetails) => {
	return (
		purDetails &&
		purDetails.map(item => {
			return {
				purchaseId: item.purchaseId,
				vName: item.vendorName,
				pName: proDetails && proDetails.find(data => data.productId === item.productId).productName,
				pDate: moment(item.purchaseDate).format('DD-MMM-YYYY'),
				quantity: item.quantity,
				price: proDetails && proDetails.find(data => data.productId === item.productId).price,
				payType: item.modeOfTransaction === 1 ? 'Cash/Cheque' : 'Cashless',
			};
		})
	);
};

export default {
	transformProductType,
	transformProductDetails,
	transformFilterProduct,
	transformPurchaseDetails,
};
