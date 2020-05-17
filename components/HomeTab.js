import React from 'react';
import DataTable from './common-components/DataTable';
import columnConstant from '../constants/constants';
import moment from 'moment';
import PieChart from './common-components/PieChart';
import transform from '../utils/transform';

class HomeTab extends React.Component {
	componentDidMount() {
		this.props.requestEmployeeDetails(); // fetching Employee details
		this.props.requestProductTypeDetails(); // fetching Product Type details
		this.props.requestSalesDetails(); // fetching sales details
		this.props.requestPurchaseDetails(); // fetching Purchase Details
		this.props.requestProductDetails(); //fetching product Details
	}

	transformEmployeeDetails = data => {
		let currentDate = moment().format('YYYY-MM');
		let noOfDaysInMonth = moment(currentDate).daysInMonth();
		return (
			data &&
			data.map(item => {
				return {
					name: item.employeeName,
					salary: item.salary * (noOfDaysInMonth - item.leaveCount),
					leaveCount: item.leaveCount,
					leaveDates: item.leaveDates === '' ? '-' : item.leaveDates,
				};
			})
		);
	};

	transformPieChartProductType = (pType, pur, sal, pro) => {
		let totalPurchaseQuant = 0;
		let totalSalesQuant = 0;
		let totalEachProductQuant = 0;

		return (
			pType &&
			pType.map(item => {
				let totalEachProductArray = [];
				let filterProduct = pro && pro.filter(data => data.productTypeId === item.productTypeId);
				filterProduct &&
					filterProduct.map(item => {
						let totalPurEachProduct = pur && pur.filter(data => data.productId === item.productId);
						let totalSalEachProduct = sal && sal.filter(data => data.productId === item.productId);

						//Total purchase quantity of each product
						totalPurchaseQuant = transform.calculateTotalQuantity(totalPurEachProduct);

						//Total sales quantity of each product
						totalSalesQuant = transform.calculateTotalQuantity(totalSalEachProduct);

						//piechart data series calculation
						let totalEachProduct = totalPurchaseQuant - totalSalesQuant;
						totalEachProductArray.push({
							name: item.productName,
							y: totalEachProduct,
						});

						//total individual product data
						totalEachProductQuant = totalEachProductArray
							.map(item => item.y)
							.reduce((prev = 0, next = 0) => prev + next, 0);
					});
				return {
					name: item.productType,
					y: totalEachProductQuant,
					drilldown: item.productTypeId,
					id: item.productTypeId,
					data: totalEachProductArray,
				};
			})
		);
	};

	render() {
		const { employeeDetails, productTypeDetails, purchaseDetails, salesDetails, productDetails } = this.props;
		const chartProductType = this.transformPieChartProductType(
			productTypeDetails,
			purchaseDetails,
			salesDetails,
			productDetails,
		);
		const transformEmpOverview = this.transformEmployeeDetails(employeeDetails);
		return (
			<div className="home-tab">
				<div className="emp-table-header">Employee details overview</div>
				<DataTable columnHeader={columnConstant.empSalaryLeaveColumnHeader} tableData={transformEmpOverview} />
				<PieChart chartProductType={chartProductType} />
			</div>
		);
	}
}

export default HomeTab;
