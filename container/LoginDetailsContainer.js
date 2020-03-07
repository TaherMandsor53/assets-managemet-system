import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserDetails } from '../actions/action';
import LoginForm from '../components/loginForm/LoginForm';

const mapStateToProps = state => ({
	userDetailsData: state.userDetails.userDetailsData,
});
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			requestUserDetails,
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
