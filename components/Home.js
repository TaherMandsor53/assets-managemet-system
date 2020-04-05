import React from 'react';
import { Segment, Icon, Tab } from 'semantic-ui-react';
import CardComponent from './common-components/CardComponent';
import ProductDetails from './product-details/ProductDetails';
import PurchaseDetails from './purchase-details/PurchaseDetails';
import SalesDetails from './sales-details/SalesDetails';
import StaffDetails from './staff-details/StaffDetails';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onLogoutClick = () => {
		return window.location.replace('http://localhost:9191/login');
	};

	tabComponent = () => {
		const panes = [
			{
				menuItem: 'Home',
				render: () => <Tab.Pane attached={false}>Home Content</Tab.Pane>,
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
		];

		return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
	};

	render() {
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
							description="20,000 INR"
							cardClass="as-purchase-card"
						/>
						<CardComponent headerName="Sales Details" description="20,000 INR" cardClass="as-sales-card" />
						<CardComponent
							headerName="Profit/Loss"
							description="20,000 INR"
							cardClass="as-profit-loss-card"
						/>
						<CardComponent headerName="Stock Details" description="20,000 INR" cardClass="as-stock-card" />
						<CardComponent
							headerName="Staff Details"
							description="20,000 INR"
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
