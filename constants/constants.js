const productDetailsColumnHeader = [
	{
		id: 'pId',
		value: 'Product Id',
	},
	{
		id: 'pType',
		value: 'Product Type',
	},
	{
		id: 'pName',
		value: 'Product Name',
	},
	{
		id: 'pDate',
		value: 'Product Date',
	},
	{
		id: 'price',
		value: 'Price',
	},
];

const purchaseDetailsColumnHeader = [
	{
		id: 'purchaseId',
		value: 'Bill No',
	},
	{
		id: 'vName',
		value: 'Vendor Name',
	},
	{
		id: 'pName',
		value: 'Product Name',
	},
	{
		id: 'pDate',
		value: 'Purchase Date',
	},
	{
		id: 'quantity',
		value: 'Quantity',
	},
	{
		id: 'price',
		value: 'Price',
	},
	{
		id: 'payType',
		value: 'Payment Mode',
	},
];

const salesDetailsColumnHeader = [
	{
		id: 'custType',
		value: 'Customer Type',
	},
	{
		id: 'billNo',
		value: 'Bill No',
	},
	{
		id: 'custName',
		value: 'Customer Name',
	},
	{
		id: 'pName',
		value: 'Product Name',
	},
	{
		id: 'sDate',
		value: 'Sales Date',
	},
	{
		id: 'quantity',
		value: 'Quantity',
	},
	{
		id: 'price',
		value: 'Price',
	},
	{
		id: 'payType',
		value: 'Payment Mode',
	},
];

const employeeDesignation = [
	{
		text: 'Cashier',
		value: '1',
	},
	{
		text: 'Retail Buyer',
		value: '2',
	},
	{
		text: 'Store Manager',
		value: '3',
	},
	{
		text: 'Customer Service Assistant',
		value: '4',
	},
];

const employeeDetailsColumnHeader = [
	{
		id: 'name',
		value: 'Staff Name',
	},
	{
		id: 'designation',
		value: 'Staff Designation',
	},
	{
		id: 'dob',
		value: 'Date Of Birth',
	},
	{
		id: 'salary',
		value: 'Staff Salary',
	},
	{
		id: 'identityNo',
		value: 'Identification No',
	},
	{
		id: 'doj',
		value: 'Date Of Joining',
	},
];

export default {
	productDetailsColumnHeader,
	purchaseDetailsColumnHeader,
	salesDetailsColumnHeader,
	employeeDesignation,
	employeeDetailsColumnHeader,
};
