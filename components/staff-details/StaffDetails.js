import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import transform from '../../utils/transform';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import columnConstant from '../../constants/constants';
import DataTable from '../common-components/DataTable';
import MessageComponent from '../common-components/MessageComponent';

class StaffDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			staffName: '',
			address: '',
			designationId: '',
			salaryVal: '',
			dob: '',
			doj: '',
			identityVal: '',
			modalOpen: false,

			//Error Label
			NameErrorCheck: false,
			NameErrorLabel: '',
			addressErrorCheck: false,
			addressErrorLabel: '',
			designationErrorCheck: false,
			designationErrorLabel: '',
			salaryErrorCheck: false,
			salaryErrorLabel: '',
			dobErrorCheck: false,
			dobErrorLabel: '',
			dojErrorCheck: false,
			dojErrorLabel: '',
			identityErrorCheck: false,
			identityErrorLabel: '',
		};
	}

	componentDidMount() {
		this.props.requestEmployeeDetails();
	}

	onModalClose = () => {
		this.setState({ modalOpen: false });
		this.props.requestEmployeeDetails();
	};

	onStaffNameChange = event => {
		this.setState({ staffName: event.target.value });
	};

	onAddressChange = event => {
		this.setState({ address: event.target.value });
	};

	onDesignationChange = (event, data) => {
		this.setState({ designationId: data.value });
	};

	onSalaryChange = event => {
		this.setState({ salaryVal: event.target.value.replace(/[^0-9\.]/g, '') });
	};

	onDOBChange = date => {
		this.setState({ dob: date });
	};

	onDOJChange = date => {
		this.setState({ doj: date });
	};

	onIdentityChange = event => {
		this.setState({ identityVal: event.target.value });
	};

	onSubmit = () => {
		const { staffName, address, designationId, salaryVal, dob, doj, identityVal } = this.state;
		if (
			staffName.length > 0 &&
			address.length > 0 &&
			designationId.length > 0 &&
			salaryVal.length > 0 &&
			dob &&
			doj &&
			identityVal.length > 0
		) {
			let dobDBFormat = moment(dob).format('YYYY-MM-DD');
			let dojDBFormat = moment(doj).format('YYYY-MM-DD');
			this.props.insertEmployeeDetails(
				designationId,
				staffName,
				address,
				dobDBFormat,
				dojDBFormat,
				identityVal,
				salaryVal,
			);

			this.setState({
				staffName: '',
				address: '',
				designationId: '',
				salaryVal: '',
				dob: '',
				doj: '',
				identityVal: '',
				//Error Checks & Labels
				NameErrorCheck: false,
				NameErrorLabel: '',
				addressErrorCheck: false,
				addressErrorLabel: '',
				designationErrorCheck: false,
				designationErrorLabel: '',
				salaryErrorCheck: false,
				salaryErrorLabel: '',
				dobErrorCheck: false,
				dobErrorLabel: '',
				dojErrorCheck: false,
				dojErrorLabel: '',
				identityErrorCheck: false,
				identityErrorLabel: '',
				modalOpen: true,
			});
		} else {
			this.setState({
				NameErrorCheck: true,
				NameErrorLabel: 'Staff name is Mandatory',
				addressErrorCheck: true,
				addressErrorLabel: 'Address is Mandatory',
				designationErrorCheck: true,
				designationErrorLabel: 'Please select any option',
				salaryErrorCheck: true,
				salaryErrorLabel: 'Salary is Mandatory',
				dobErrorCheck: true,
				dobErrorLabel: 'Please select any date',
				dojErrorCheck: true,
				dojErrorLabel: 'Please select any date',
				identityErrorCheck: true,
				identityErrorLabel: 'Identification no is Mandatory',
			});
		}
	};

	onCancel = () => {
		this.setState({
			staffName: '',
			address: '',
			designationId: '',
			salaryVal: '',
			dob: '',
			doj: '',
			identityVal: '',
			//Error Checks & Labels
			NameErrorCheck: false,
			NameErrorLabel: '',
			addressErrorCheck: false,
			addressErrorLabel: '',
			designationErrorCheck: false,
			designationErrorLabel: '',
			salaryErrorCheck: false,
			salaryErrorLabel: '',
			dobErrorCheck: false,
			dobErrorLabel: '',
			dojErrorCheck: false,
			dojErrorLabel: '',
			identityErrorCheck: false,
			identityErrorLabel: '',
		});
	};

	render() {
		const {
			modalOpen,
			staffName,
			address,
			designationId,
			salaryVal,
			dob,
			doj,
			identityVal,
			NameErrorCheck,
			NameErrorLabel,
			addressErrorCheck,
			addressErrorLabel,
			designationErrorCheck,
			designationErrorLabel,
			salaryErrorCheck,
			salaryErrorLabel,
			dobErrorCheck,
			dobErrorLabel,
			dojErrorCheck,
			dojErrorLabel,
			identityErrorCheck,
			identityErrorLabel,
		} = this.state;
		const { employeeDetails } = this.props;
		const transformEmployeeDetails = transform.transformEmployeeDetails(
			employeeDetails,
			columnConstant.employeeDesignation,
		);
		return (
			<Fragment>
				<div className="employee-details">
					<div className="employee-details-form">
						<div className="ed-part1">
							<div className="employee-labels-part1">
								<p className="elabel">Staff Name</p>
								<p className="elabel">Address</p>
								<p className="elabel">Designation</p>
								<p className="elabel">Date Of Birth</p>
							</div>
							<div className="employee-text-part1">
								<input
									className={NameErrorCheck ? 'etext-error' : 'etextbox'}
									type="text"
									onChange={this.onStaffNameChange}
									value={staffName}
									id="staffName"
									placeholder={NameErrorLabel}
								/>
								<br />
								<input
									className={addressErrorCheck ? 'etext-error' : 'etextbox'}
									type="text"
									onChange={this.onAddressChange}
									value={address}
									id="address"
									placeholder={addressErrorLabel}
								/>
								<br />
								<Dropdown
									selection
									options={columnConstant.employeeDesignation}
									placeholder={designationErrorCheck ? designationErrorLabel : 'Staff Designation'}
									className={designationErrorCheck ? 'edropdown-error' : 'edropdown'}
									value={designationId}
									onChange={this.onDesignationChange}
								/>
								<br />
								<DatePicker
									placeholderText={dobErrorCheck ? dobErrorLabel : 'Birth date'}
									onChange={this.onDOBChange}
									dateFormat="d-MMM-yyyy"
									selected={dob}
									className={dobErrorCheck && 'eDate-error'}
								/>
							</div>
						</div>
						<div className="ed-part2">
							<div className="employee-labels-part2">
								<p className="elabel">Salary (per day)</p>
								<p className="elabel">Identity (Aadhaar no)</p>
								<p className="elabel">Date Of Joining</p>
							</div>
							<div className="employee-text-part2">
								<input
									className={salaryErrorCheck ? 'etext-error' : 'etextbox'}
									type="text"
									onChange={this.onSalaryChange}
									value={salaryVal}
									id="salary"
									placeholder={salaryErrorLabel}
								/>

								<br />
								<input
									className={identityErrorCheck ? 'etext-error' : 'etextbox'}
									type="text"
									onChange={this.onIdentityChange}
									value={identityVal}
									id="identity"
									placeholder={identityErrorLabel}
								/>
								<br />
								<DatePicker
									placeholderText={dojErrorCheck ? dojErrorLabel : 'Joining date'}
									onChange={this.onDOJChange}
									dateFormat="d-MMM-yyyy"
									selected={doj}
									className={dojErrorCheck && 'eDate-error'}
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

				<DataTable
					columnHeader={columnConstant.employeeDetailsColumnHeader}
					tableData={transformEmployeeDetails}
					showIcon="name"
				/>

				<MessageComponent
					modalOpen={modalOpen}
					modalHeader="Employee Details"
					modalContent="Employee details added successfully"
					onClose={this.onModalClose}
				/>
			</Fragment>
		);
	}
}

export default StaffDetails;
