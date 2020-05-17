import React from 'react';
import { Segment, Icon, Tab } from 'semantic-ui-react';
import CardComponent from './common-components/CardComponent';
import ProductDetails from './product-details/ProductDetails';
import PurchaseDetails from './purchase-details/PurchaseDetails';
import SalesDetails from './sales-details/SalesDetails';
import StaffDetails from './staff-details/StaffDetails';
import StaffAttendanceDetails from './staff-attendance-details/StaffAttendanceDetails';
import HomeTab from './HomeTab';
import moment from 'moment';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { requestPurchaseDetails, requestSalesDetails, requestEmployeeDetails } = this.props;
		requestPurchaseDetails(); // fetch purchase details
		requestSalesDetails(); // fetch sales details
		requestEmployeeDetails(); // fetch employee details
	}

	onLogoutClick = () => {
		return window.location.replace('http://localhost:9191/login');
	};

	tabComponent = () => {
		const panes = [
			{
				menuItem: 'Home',
				render: () => <HomeTab {...this.props} />,
			},
			{
				menuItem: 'Product Details',
				render: () => <ProductDetails {...this.props} />,
			},
			{
				menuItem: 'Purchase Details',
				render: () => <PurchaseDetails {...this.props} />,
			},
			{
				menuItem: 'Sales Details',
				render: () => <SalesDetails {...this.props} />,
			},
			{
				menuItem: 'Staff Details',
				render: () => <StaffDetails {...this.props} />,
			},
			{
				menuItem: 'Staff Attendance Details',
				render: () => <StaffAttendanceDetails {...this.props} />,
			},
		];

		return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
	};

	calculateTotalAmt = data => {
		return data && data.map(item => item.totalAmount).reduce((prev, next) => prev + next, 0);
	};

	displayEmpLeaves = data => {
		return (
			data &&
			data.map(item => {
				return `<div class='leave-count'>${item.employeeName} - ${item.leaveCount}</div>`;
			})
		);
	};

	render() {
		const { purchaseDetails, salesDetails, employeeDetails } = this.props;
		let currentMonth = moment().format('MMM-YYYY');

		//Total purchase amount calculation
		let filterPurchaseCurrentMonth =
			purchaseDetails &&
			purchaseDetails.filter(item => moment(item.purchaseDate).format('MMM-YYYY') === currentMonth);
		let totalMonthPurchaseAmt = this.calculateTotalAmt(filterPurchaseCurrentMonth);

		//Total sales amount calculation
		let filterSalesCurrentMonth =
			salesDetails && salesDetails.filter(item => moment(item.salesDate).format('MMM-YYYY') === currentMonth);
		let totalMonthSalesAmt = this.calculateTotalAmt(filterSalesCurrentMonth);

		//Total stock calculation
		let totalPurchaseAmt = this.calculateTotalAmt(purchaseDetails);
		let totalSalesAmt = this.calculateTotalAmt(salesDetails);
		let stockDetailsAmt = totalPurchaseAmt - totalSalesAmt;

		//Profit & Loss calculation
		let CurrDate = new Date();
		let monthFirstDay = new Date(CurrDate.getFullYear(), CurrDate.getMonth(), 1);
		let openingStock = 0;
		if (monthFirstDay || monthFirstDay.getMonth() === CurrDate.getMonth) {
			openingStock = stockDetailsAmt;
		}
		let profitLoss = totalPurchaseAmt - totalSalesAmt - stockDetailsAmt - openingStock;

		// employee leave details
		let empLeaveDetails = this.displayEmpLeaves(employeeDetails);
		let transformEmpDetails = empLeaveDetails && empLeaveDetails.join('');
		return (
			<div className="as-home-details">
				<div className="as-banner-details">
					<Segment className="as-header">
						<span className="as-header-text">Assets Management System</span>
						<span className="as-logout-text" onClick={this.onLogoutClick}>
							<Icon name="user outline" size="large" />
							Logout
						</span>
					</Segment>
					<div className="as-banner-details">
						<CardComponent
							headerName="Purchase Details"
							description={totalMonthPurchaseAmt + ' INR'}
							cardClass="as-purchase-card"
						/>
						<CardComponent
							headerName="Sales Details"
							description={totalMonthSalesAmt + ' INR'}
							cardClass="as-sales-card"
						/>
						<CardComponent
							headerName="Stock Details"
							description={stockDetailsAmt + ' INR'}
							cardClass="as-stock-card"
						/>
						<CardComponent
							headerName="Profit/Loss"
							description={profitLoss + ' INR'}
							cardClass={profitLoss > 0 ? 'profit-card' : profitLoss === 0 ? 'zero-card' : 'loss-card'}
						/>
						<CardComponent
							headerName="Staff Leave Details"
							description={transformEmpDetails}
							cardClass="as-staff-management-card"
						/>
					</div>
				</div>
				<div className="as-tab-details">{this.tabComponent()}</div>
			</div>
		);
	}
}

export default Home;
