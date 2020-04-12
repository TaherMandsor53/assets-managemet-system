import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import transform from '../../utils/transform';
import { RangeCalendar } from 'react-date-picker-range';
import moment from 'moment';
import columnConstant from '../../constants/constants';
import DataTable from '../common-components/DataTable';
import MessageComponent from '../common-components/MessageComponent';

class StaffAttendanceDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			designationId: '',
			nameId: '',
			leaveDate: '',
			showLabel: true,
			leaveCount: '',
			//Error Labels & checks
			designationErrorCheck: false,
			designationErrorLabel: '',
			nameErrorCheck: false,
			nameErrorLabel: '',
			leaveDateErrorCheck: false,
			leaveDateErrorLabel: '',
		};
	}

	componentDidMount() {
		this.props.requestEmployeeDetails();
	}

	onModalClose = () => {
		this.setState({ modalOpen: false });
	};

	onDesignationChange = (event, data) => {
		this.setState({ designationId: data.value });
	};

	onStaffNameChange = (event, data) => {
		this.setState({ nameId: data.value });
	};

	onLeaveDateChange = (fromDate, toDate) => {
		let combineDate = moment(fromDate).format('DD-MMM-YYYY') + ' - ' + moment(toDate).format('DD-MMM-YYYY');
		let oneDay = 1000 * 60 * 60 * 24;
		let diffDate = Math.abs((fromDate - toDate) / oneDay) + 1;
		this.setState({ leaveDate: combineDate, showLabel: false, leaveCount: diffDate });
	};

	onSubmit = () => {
		const { designationId, nameId, leaveDate, leaveCount } = this.state;
		const { employeeDetails } = this.props;

		if (designationId && nameId && leaveDate.length > 0) {
			this.setState({
				modalOpen: true,
				designationId: '',
				nameId: '',
				leaveDate: '',
				showLabel: true,
				leaveCount: '',
				designationErrorCheck: false,
				designationErrorLabel: '',
				nameErrorCheck: false,
				nameErrorLabel: '',
				leaveDateErrorCheck: false,
				leaveDateErrorLabel: '',
			});
			let filterLeaveDetails = employeeDetails.find(item => item.employeeId === nameId);
			let combineLeaveCount = filterLeaveDetails.leaveCount + leaveCount;
			let combineLeaveDates = filterLeaveDetails.leaveDates + leaveDate + '<br/>';
			this.props.updateEmployeeLeaveDetails(nameId, combineLeaveCount, combineLeaveDates);
		} else {
			this.setState({
				designationErrorCheck: true,
				designationErrorLabel: 'Please select any option',
				nameErrorCheck: true,
				nameErrorLabel: 'Please select any option',
				leaveDateErrorCheck: true,
				leaveDateErrorLabel: 'Please select date range',
			});
		}
	};

	onCancel = () => {
		this.setState({
			designationId: '',
			nameId: '',
			leaveDate: '',
			showLabel: true,
			leaveCount: '',
			//Error Label
			designationErrorCheck: false,
			designationErrorLabel: '',
			nameErrorCheck: false,
			nameErrorLabel: '',
			leaveDateErrorCheck: false,
			leaveDateErrorLabel: '',
		});
	};

	render() {
		const {
			modalOpen,
			designationId,
			nameId,
			leaveDate,
			showLabel,
			leaveCount,
			designationErrorCheck,
			designationErrorLabel,
			nameErrorCheck,
			nameErrorLabel,
			leaveDateErrorCheck,
			leaveDateErrorLabel,
		} = this.state;
		const { employeeDetails } = this.props;
		console.log('Employee Details:', employeeDetails);
		// filter employee designation
		const filterSelectedDesignation =
			employeeDetails && employeeDetails.filter(item => item.designation === designationId);

		// filter employee staff name
		const filterSelectedStaffName = transform.transformStaffName(filterSelectedDesignation);

		// filter employee salary & calculate total salary
		let filterSelectedEmpDetails = employeeDetails && employeeDetails.find(item => item.employeeId === nameId);
		let empSal = filterSelectedEmpDetails && filterSelectedEmpDetails.salary;
		let fetchLeaveCount = filterSelectedEmpDetails && filterSelectedEmpDetails.leaveCount;
		let noOfDaysInMonth = moment(moment().format('YYYY-MM')).daysInMonth();
		let empTotalSal = empSal * (noOfDaysInMonth - (leaveCount + fetchLeaveCount));
		return (
			<Fragment>
				<div className="employee-details">
					<div className="employee-details-form">
						<div className="ed-part1">
							<div className="employee-labels-part1">
								<p className="elabel">Staff Designation</p>
								<p className="elabel">Staff Name</p>
								<p className="elabel">Leave Dates</p>
								<p className="elabel">Total Leaves</p>
								<p className="elabel">Total salary to be paid</p>
							</div>
							<div className="employee-text-part1">
								<Dropdown
									selection
									options={columnConstant.employeeDesignation}
									placeholder="Staff Designation"
									className="edropdown"
									value={designationId}
									onChange={this.onDesignationChange}
								/>
								<span className="edropdown-error">{designationErrorLabel}</span>
								<br />
								<Dropdown
									selection
									options={filterSelectedStaffName}
									placeholder="Staff Name"
									className="edropdown"
									value={nameId}
									onChange={this.onStaffNameChange}
								/>
								<span className="edropdown-error">{nameErrorLabel}</span>
								<br />
								<div className="range-cal">
									<RangeCalendar
										label={showLabel && 'Leave Dates'}
										onChangeDate={this.onLeaveDateChange}
										value={!showLabel && leaveDate}
									/>
									<span className="dateRange-error">{leaveDateErrorLabel}</span>
								</div>
								<br />
								<input className="etextbox-leaveCount" value={leaveCount} readOnly />
								<br />
								<input
									className="etextbox-empSal"
									value={isNaN(empTotalSal) ? '' : empTotalSal}
									readOnly
								/>
							</div>
						</div>
					</div>
					<div className="employee-btn">
						<button className="btn-submit" type="submit" onClick={this.onSubmit}>
							Submit
						</button>
						<button className="btn-cancel" type="button" onClick={this.onCancel}>
							Cancel
						</button>
					</div>
				</div>

				<MessageComponent
					modalOpen={modalOpen}
					modalHeader="Staff Attendance Details"
					modalContent="Staff attendance updated successfully"
					onClose={this.onModalClose}
				/>
			</Fragment>
		);
	}
}

export default StaffAttendanceDetails;
