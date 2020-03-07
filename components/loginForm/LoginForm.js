import React, { Component } from 'react';
import { Button, Form, Segment, Icon } from 'semantic-ui-react';
import loginImage from '../../assets/assets-login.png';
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: '',
			passValue: '',
			loggedIn: false,
			errorCheck: false,
			label: '',
			showLoginForm: true,
			showSecurityForm: false,
			showChangePassForm: false,
			securityAnsValue: '',
		};
		this.emailHandleChange = this.emailHandleChange.bind(this);
		this.passHandleChange = this.passHandleChange.bind(this);
		this.onLoginClick = this.onLoginClick.bind(this);
		this.onSubmitClick = this.onSubmitClick.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.onForgotPasswordClick = this.onForgotPasswordClick.bind(this);
		this.onSecurityChange = this.onSecurityChange.bind(this);
	}

	componentDidMount() {
		const { requestUserDetails } = this.props;
		requestUserDetails();
	}

	emailHandleChange(event) {
		this.setState({ emailValue: event.target.value });
	}

	passHandleChange(event) {
		this.setState({ passValue: event.target.value });
	}

	onSecurityChange(event) {
		this.setState({ securityAnsValue: event.target.value });
	}

	onLoginClick() {
		const { userDetailsData } = this.props;
		const { passValue, emailValue } = this.state;

		if (userDetailsData[0].email === emailValue && userDetailsData[0].password === passValue) {
			this.setState({ errorCheck: false, label: '', emailValue: '', passValue: '', loggedIn: true });
		} else {
			this.setState({ errorCheck: true, label: 'Please enter valid UserName/Password', loggedIn: false });
		}
	}

	//Show Login Form
	displayLoginForm() {
		const { errorCheck, emailValue, passValue } = this.state;
		return (
			<Form className="login-form">
				<Segment stacked className="login-box">
					<Form.Input
						icon="user"
						iconPosition="left"
						placeholder="E-mail address"
						className="login-input"
						onChange={this.emailHandleChange}
						error={errorCheck}
						label={this.state.label}
						value={emailValue}
					/>
					<Form.Input
						icon="lock"
						iconPosition="left"
						placeholder="Password"
						type="password"
						className="login-input"
						onChange={this.passHandleChange}
						error={errorCheck}
						value={passValue}
					/>

					<Button className="login-button" onClick={this.onLoginClick}>
						Login Now
					</Button>
					<Button className="forgot-pass-button" onClick={this.onForgotPasswordClick}>
						Forgot Password?
					</Button>
				</Segment>
			</Form>
		);
	}

	onForgotPasswordClick() {
		this.setState({ showLoginForm: false, showSecurityForm: true });
	}

	onCancelClick() {}

	onSubmitClick() {
		if (this.props.userDetailsData[0].securityAnswer === this.state.securityAnsValue) {
			this.setState({ errorCheck: false, label: '', showChangePassForm: true, showSecurityForm: false });
		} else {
			this.setState({
				errorCheck: true,
				label: 'Please enter valid security details',
				showChangePassForm: false,
				showSecurityForm: true,
			});
		}
	}

	//Show Security Form
	displaySecurityForm() {
		const { errorCheck, securityAnsValue, label } = this.state;

		return (
			<Form className="login-form">
				<Segment stacked className="login-box">
					<Form.Input
						icon="key"
						iconPosition="left"
						placeholder="What is your favourite hobby?"
						className="login-input"
						onChange={this.onSecurityChange}
						error={errorCheck}
						label={label}
						value={securityAnsValue}
					/>

					<Button className="security-submit-button" onClick={this.onSubmitClick}>
						Submit
					</Button>
					<Button className="security-cancel-button" onClick={this.onCancelClick}>
						Cancel
					</Button>
				</Segment>
			</Form>
		);
	}

	render() {
		const { userDetailsData } = this.props;
		const { showLoginForm, showSecurityForm } = this.state;
		return (
			<div className="assets-login-details">
				<div className="assets-heading">
					<Icon name="cogs" size="big" className="assets-icon" />
					<h2 className="assets-text">Assets Management System</h2>
				</div>
				<div className="assets-image-form">
					<img src={loginImage} className="assets-login-img" />
					<div className="login-details-form">
						<div className="login-header-text">Welcome Back :)</div>
						<p className="login-sub-text">
							To keep connected please login with your personal information by email address and password
						</p>
						{showLoginForm && this.displayLoginForm()}
						{!showLoginForm && showSecurityForm && this.displaySecurityForm()}
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
