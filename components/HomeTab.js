import React from 'react';
import DataTable from './common-components/DataTable';
import columnConstant from '../constants/constants';
import moment from 'moment';

class HomeTab extends React.Component {
	componentDidMount() {
		this.props.requestEmployeeDetails();
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

	render() {
		const transformEmpOverview = this.transformEmployeeDetails(this.props.employeeDetails);
		return (
			<div className="home-tab">
				<div className="emp-table-header">Employee details overview</div>
				<DataTable columnHeader={columnConstant.empSalaryLeaveColumnHeader} tableData={transformEmpOverview} />
			</div>
		);
	}
}

export default HomeTab;
