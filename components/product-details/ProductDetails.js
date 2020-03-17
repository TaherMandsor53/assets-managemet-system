import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import SingleCalendar from 'react-date-picker-range';
import transform from '../../utils/transform';

class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productIdVal: '',
			productNameVal: '',
			productDateVal: '',
			productTypeVal: '',
			productPriceVal: '',
		};
	}

	componentDidMount() {
		const { requestProductTypeDetails } = this.props;
		requestProductTypeDetails();
	}

	onProductIdChange = event => {
		this.setState({ productIdVal: event.target.value });
	};

	onProductTypeChange = event => {
		this.setState({ productTypeVal: event.target.value });
	};

	onProductNameChange = event => {
		this.setState({ productNameVal: event.target.value });
	};

	onProductPriceChange = event => {
		this.setState({ productPriceVal: event.target.value });
	};

	render() {
		const { productIdVal, productNameVal } = this.state;
		const { productTypeDetails } = this.props;
		const transformProductType = transform.transformProductType(productTypeDetails.data);
		console.log('Transform data:', transformProductType);
		return (
			<div className="as-product-details">
				<div className="product-id">
					<p className="id-text">Product Id</p>
					<Input onChange={this.onProductIdChange} value={productIdVal} />
				</div>
				<div className="product-type">
					<p className="type-text">Product Type</p>
					<Dropdown options={transformProductType} selection />
				</div>
				<div className="product-date">
					<p className="date-text">Product date</p>
					<SingleCalendar value="" />
				</div>
				<div className="product-name">
					<p className="name-text">Product Name</p>
					<Input onChange={this.onProductNameChange} />
				</div>
				<div className="product-price">
					<p className="price-text">Price</p>
					<Input onChange={this.onProductPriceChange} />
				</div>
				<div>
					<button className="btn-submit">Submit</button>
					<button className="btn-cancel">Cancel</button>
				</div>
			</div>
		);
	}
}

export default ProductDetails;
