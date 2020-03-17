import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestProductTypeDetails } from '../actions/action';
import Home from '../components/Home';

const mapStateToProps = state => ({
	productTypeDetails: state.productTypeDetails.productTypeDetailsData,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			requestProductTypeDetails,
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
