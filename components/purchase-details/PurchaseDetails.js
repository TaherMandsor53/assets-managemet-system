import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import transform from '../../utils/transform';
import { DatePicker } from 'antd';

class PurchaseDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTypeId: '',
			purchaseDateVal: '',
			productVal: '',
			totalAmtVal: '',
		};
	}

	componentDidMount() {
		const { requestProductDetails, requestProductTypeDetails } = this.props;
		requestProductDetails(); //fetching product Details
		requestProductTypeDetails(); // fetching Product Type details
	}

	onProductTypeChange = (event, data) => {
		this.setState({ selectedTypeId: data.value });
		document.getElementById('quantity').value = '';
	};

	onProductDateChange = date => {
		this.setState({ purchaseDateVal: date._d });
	};

	onProductChange = (event, data) => {
		this.setState({ productVal: data.value });
		document.getElementById('quantity').value = '';
	};

	onQuantityChange = event => {
		let price = document.getElementsByClassName('ptextbox-price')[0].value;
		let totalAmount = price * event.target.value;
		this.setState({ totalAmtVal: totalAmount });
	};

	render() {
		const { productTypeDetails, productDetails } = this.props;
		const { selectedTypeId, purchaseDateVal, productVal, totalAmtVal } = this.state;
		const transformProductTypeDetails = transform.transformProductType(productTypeDetails && productTypeDetails);
		console.log('Product Details:', productDetails);
		let productFilter = productDetails && productDetails.filter(item => item.productTypeId === selectedTypeId);
		const transformFilterProduct = transform.transformFilterProduct(productFilter);
		let productPrice = productFilter && productFilter.find(item => item.productId === productVal);

		return (
			<Fragment>
				<div className="purchase-details">
					<form className="purchase-details-form">
						<div className="pd-part1">
							<div className="purchase-labels-part1">
								<p className="plabel">Bill No</p>
								<p className="plabel">Vendor Name</p>
								<p className="plabel">Product Type</p>
								<p className="plabel">Product Name</p>
								<p className="plabel">Purchase Date</p>
								<div className="purchase-btn">
									<button className="btn-submit" type="submit">
										Submit
									</button>
									<button className="btn-cancel" type="reset">
										Cancel
									</button>
								</div>
							</div>
							<div className="purchase-text-part1">
								<input className="ptextbox" required type="text" />
								<br />
								<input className="ptextbox" required type="text" />
								<br />
								<Dropdown
									selection
									options={transformProductTypeDetails}
									placeholder="Product Category"
									className="pdropdown"
									onChange={this.onProductTypeChange}
								/>
								<br />
								<Dropdown
									selection
									options={transformFilterProduct}
									placeholder="Product"
									className="pdropdown"
									onChange={this.onProductChange}
								/>
								<br />
								<DatePicker
									placeholder="Purchase date"
									onChange={this.onProductDateChange}
									format="DD-MMM-YYYY"
								/>
							</div>
						</div>
						<div className="pd-part2">
							<div className="purchase-labels-part2">
								<p className="plabel">Product Quantity</p>
								<p className="plabel">Product Price</p>
								<p className="plabel">Total Amount to be paid</p>
								<p className="plabel">Payment Option</p>
								<p className="plabel">Transaction Id</p>
							</div>
							<div className="purchase-text-part2">
								<input
									className="ptextbox"
									required
									type="text"
									onChange={this.onQuantityChange}
									pattern="[\d]{9}"
									id="quantity"
								/>
								<br />
								<input
									className="ptextbox-price"
									type="text"
									value={productPrice ? productPrice.price : ''}
									readOnly
								/>
								<br />
								<input
									className="ptextbox-total"
									type="text"
									readOnly
									value={totalAmtVal ? totalAmtVal : ''}
								/>
								<div className="payment-mode">
									<input
										type="radio"
										id="cash"
										name="payment"
										value="1"
										required
										className="cash-pradio"
									/>
									<label for="cash" className="cash-text">
										Cash/Cheque
									</label>
									<input
										type="radio"
										id="cashless"
										name="payment"
										value="2"
										required
										className="cashless-pradio"
									/>
									<label for="cashless" className="cashless-text">
										Cashless
									</label>
								</div>
								<input className="ptextbox" type="text" />
							</div>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default PurchaseDetails;
