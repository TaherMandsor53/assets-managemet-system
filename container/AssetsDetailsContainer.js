import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestProductTypeDetails, insertProductDetails, requestProductDetails } from '../actions/action';
import Home from '../components/Home';

const mapStateToProps = state => ({
	productTypeDetails: state.productTypeDetails.productTypeDetailsData.data,
	insertProductDetails: state.insertProductDetails.insertProductDetailsData,
	productDetails: state.productDetails.productDetailsData.data,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			requestProductTypeDetails,
			insertProductDetails,
			requestProductDetails,
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
