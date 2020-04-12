import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	requestProductTypeDetails,
	insertProductDetails,
	requestProductDetails,
	insertPurchaseDetails,
	requestPurchaseDetails,
	insertSalesDetails,
	requestSalesDetails,
	insertEmployeeDetails,
	requestEmployeeDetails,
	updateEmployeeLeaveDetails,
} from '../actions/action';
import Home from '../components/Home';

const mapStateToProps = state => ({
	productTypeDetails: state.productTypeDetails.productTypeDetailsData.data,
	insertProductDetails: state.insertProductDetails.insertProductDetailsData,
	productDetails: state.productDetails.productDetailsData.data,
	insertPurchaseDetails: state.insertPurchaseDetails.insertPurchaseDetailsData.data,
	purchaseDetails: state.purchaseDetails.purchaseDetailsData.data,
	insertSalesDetails: state.insertSalesDetails.insertSalesDetailsData.data,
	salesDetails: state.salesDetails.salesDetailsData.data,
	insertEmployeeDetails: state.insertEmployeeDetails.insertEmployeeDetailsData.data,
	employeeDetails: state.employeeDetails.employeeDetailsData.data,
	updateEmployeeLeaveDetails: state.updateEmployeeLeaveDetails.updateEmployeeLeaveDetailsData.data,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			requestProductTypeDetails,
			insertProductDetails,
			requestProductDetails,
			insertPurchaseDetails,
			requestPurchaseDetails,
			insertSalesDetails,
			requestSalesDetails,
			insertEmployeeDetails,
			requestEmployeeDetails,
			updateEmployeeLeaveDetails,
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
