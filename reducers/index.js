import { combineReducers } from 'redux';

import userDetails from './UserDetailsReducer';
import passwordDetailsData from './UpdatePasswordReducer';
import productTypeDetails from './ProductTypeDetailsReducer';
import insertProductDetails from './InsertProductDetailsReducer';
import productDetails from './ProductDetailsReducer';
import insertPurchaseDetails from './InsertPurchaseDetailsReducer';
import purchaseDetails from './PurchaseDetailsReducer';
import insertSalesDetails from './InsertSalesDetailsReducer';
import salesDetails from './SalesDetailsReducer';
import insertEmployeeDetails from './InsertEmployeeDetailsReducer';
import employeeDetails from './EmployeeDetailsReducer';

export default combineReducers({
	userDetails,
	passwordDetailsData,
	productTypeDetails,
	insertProductDetails,
	productDetails,
	insertPurchaseDetails,
	purchaseDetails,
	insertSalesDetails,
	salesDetails,
	insertEmployeeDetails,
	employeeDetails,
});
