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
				payType: item.modeOfTransaction === '1' ? 'Cash/Cheque' : 'Cashless',
			};
		})
	);
};

const transformSalesDetails = (salesDetails, proDetails) => {
	return (
		salesDetails &&
		salesDetails.map(item => {
			return {
				custType: item.customerType === '1' ? 'Registered' : 'Unregistered',
				billNo: item.billNo,
				custName: item.customerName,
				pName: proDetails && proDetails.find(data => data.productId === item.productId).productName,
				sDate: moment(item.salesDate).format('DD-MMM-YYYY'),
				quantity: item.quantity,
				price: proDetails && proDetails.find(data => data.productId === item.productId).price,
				// price: sellingPrice,
				payType: item.modeOfTransaction === '1' ? 'Cash/Cheque' : 'Cashless',
			};
		})
	);
};

const transformEmployeeDetails = (data, designation) => {
	let currentDate = moment().format('YYYY-MM');
	let noOfDaysInMonth = moment(currentDate).daysInMonth();
	return (
		data &&
		data.map(item => {
			return {
				name: item.employeeName,
				designation: designation && designation.find(data => data.value === item.designation).text,
				dob: moment(item.dateOfBirth).format('DD-MMM-YYYY'),
				salary: item.salary * noOfDaysInMonth,
				identityNo: item.identityNo,
				doj: moment(item.dateOfJoining).format('DD-MMM-YYYY'),
			};
		})
	);
};

const transformStaffName = data => {
	return (
		data &&
		data.map(item => {
			return {
				text: item.employeeName,
				value: item.employeeId,
			};
		})
	);
};

const calculateTotalQuantity = data => {
	return data && data.map(item => item.quantity).reduce((prev = 0, next = 0) => prev + next, 0);
};

export default {
	transformProductType,
	transformProductDetails,
	transformFilterProduct,
	transformPurchaseDetails,
	transformSalesDetails,
	transformEmployeeDetails,
	transformStaffName,
	calculateTotalQuantity,
};
