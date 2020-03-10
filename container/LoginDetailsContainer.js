import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserDetails, updatePasswordDetails } from '../actions/action';
import LoginForm from '../components/loginForm/LoginForm';

const mapStateToProps = state => ({
	userDetailsData: state.userDetails.userDetailsData.data,
	passwordDetailsData: state.passwordDetailsData.passwordDetails,
});
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			requestUserDetails,
			updatePasswordDetails,
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
