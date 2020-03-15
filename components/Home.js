import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import CardComponent from './common-components/CardComponent';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onLogoutClick = () => {
		return window.location.replace('http://localhost:9191/login');
	};
	render() {
		return (
			<div className="as-home-details">
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
					<CardComponent headerName="Profit/Loss" description="20,000 INR" cardClass="as-profit-loss-card" />
					<CardComponent headerName="Stock Details" description="20,000 INR" cardClass="as-stock-card" />
					<CardComponent
						headerName="Staff Details"
						description="20,000 INR"
						cardClass="as-staff-management-card"
					/>
				</div>
			</div>
		);
	}
}

export default Home;
