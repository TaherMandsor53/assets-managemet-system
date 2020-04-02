import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import transform from '../../utils/transform';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import columnConstant from '../../constants/constants';
import DataTable from '../common-components/DataTable';

class SalesDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTypeId: '',
			purchaseDateVal: '',
			productVal: '',
			totalAmtVal: '',
			purchaseId: '',
			vendorName: '',
			quantityVal: '',
			paymentMode: '',
			transactionId: '',
			custCheck: false,
		};
	}

	componentDidMount() {
		const { requestProductDetails, requestProductTypeDetails, requestPurchaseDetails } = this.props;
		requestProductDetails(); //fetching product Details
		requestProductTypeDetails(); // fetching Product Type details
	}

	onProductTypeChange = (event, data) => {
		this.setState({ selectedTypeId: data.value });
		document.getElementById('quantity').value = '';
	};

	onProductDateChange = date => {
		this.setState({ purchaseDateVal: date });
	};

	onProductChange = (event, data) => {
		this.setState({ productVal: data.value });
		document.getElementById('quantity').value = '';
	};

	onQuantityChange = event => {
		let price = document.getElementsByClassName('stextbox-price')[0].value;
		let totalAmount = price * event.target.value;
		this.setState({ totalAmtVal: totalAmount, quantityVal: event.target.value });
	};

	onBillNoChange = event => {
		this.setState({ purchaseId: event.target.value });
	};

	onVendorNameChange = event => {
		this.setState({ vendorName: event.target.value });
	};

	onPaymentModeChange = event => {
		this.setState({ paymentMode: event.target.value });
	};

	onTransactionChange = event => {
		this.setState({ transactionId: event.target.value });
	};

	onCustomerTypeCheck = event => {
		if (event.target.value === '2') {
			document.getElementById('billNo').readOnly = true;
			document.getElementById('custName').readOnly = true;
			this.setState({ custCheck: true });
		} else {
			document.getElementById('billNo').readOnly = false;
			document.getElementById('custName').readOnly = false;
			this.setState({ custCheck: false });
		}
	};

	onSubmit = () => {
		const {
			purchaseId,
			vendorName,
			productVal,
			purchaseDateVal,
			quantityVal,
			totalAmtVal,
			paymentMode,
			transactionId,
		} = this.state;

		this.setState({
			purchaseId: '',
			productVal: '',
			quantityVal: '',
			totalAmtVal: '',
			vendorName: '',
			paymentMode: '',
			transactionId: '',
			purchaseDateVal: '',
			selectedTypeId: '',
		});
		document.getElementById('cash').checked = false;
		document.getElementById('cashless').checked = false;
		document.getElementById('registered').checked = false;
		document.getElementById('unregistered').checked = false;
	};

	onCancel = () => {
		this.setState({
			purchaseId: '',
			productVal: '',
			quantityVal: '',
			totalAmtVal: '',
			vendorName: '',
			paymentMode: '',
			transactionId: '',
			purchaseDateVal: '',
			selectedTypeId: '',
		});
		document.getElementById('cash').checked = false;
		document.getElementById('cashless').checked = false;
		document.getElementById('registered').checked = false;
		document.getElementById('unregistered').checked = false;
	};

	render() {
		const { productTypeDetails, productDetails, purchaseDetails } = this.props;
		const {
			selectedTypeId,
			purchaseDateVal,
			productVal,
			totalAmtVal,
			vendorName,
			quantityVal,
			purchaseId,
			transactionId,
			custCheck,
		} = this.state;
		const transformProductTypeDetails = transform.transformProductType(productTypeDetails && productTypeDetails);
		let productFilter = productDetails && productDetails.filter(item => item.productTypeId === selectedTypeId);
		const transformFilterProduct = transform.transformFilterProduct(productFilter);
		let productPrice = productFilter && productFilter.find(item => item.productId === productVal);

		return (
			<Fragment>
				<div className="sales-details">
					<form method="post" action="/">
						<div className="sales-details-form">
							<div className="sd-part1">
								<div className="sales-labels-part1">
									<p className="slabel">Customer Type</p>
									<p className="slabel">Bill No</p>
									<p className="slabel">Customer Name</p>
									<p className="slabel">Product Type</p>
									<p className="slabel">Product Name</p>
									<p className="slabel">Sales Date</p>
								</div>
								<div className="sales-text-part1">
									<div className="customer-type">
										<input
											type="radio"
											id="registered"
											name="customerType"
											value="1"
											required
											className="registered-sradio"
											required
											onClick={this.onCustomerTypeCheck}
										/>
										<label for="registered" className="registered-text">
											Registered
										</label>
										<input
											type="radio"
											id="unregistered"
											name="customerType"
											value="2"
											required
											className="unregistered-sradio"
											onClick={this.onCustomerTypeCheck}
										/>
										<label for="unregistered" className="unregistered-text">
											Unregistered
										</label>
									</div>

									<input
										className={custCheck ? 'stextbox-billNo' : 'stextbox'}
										required
										type="text"
										onChange={this.onBillNoChange}
										value={purchaseId}
										id="billNo"
									/>
									<br />
									<input
										className={custCheck ? 'stextbox-custName' : 'stextbox'}
										required
										type="text"
										onChange={this.onVendorNameChange}
										value={vendorName}
										id="custName"
									/>
									<br />
									<Dropdown
										selection
										options={transformProductTypeDetails}
										placeholder="Product Category"
										className="sdropdown"
										onChange={this.onProductTypeChange}
										value={selectedTypeId}
									/>
									<br />
									<Dropdown
										selection
										options={transformFilterProduct}
										placeholder="Product"
										className="sdropdown"
										onChange={this.onProductChange}
										value={productVal}
									/>
									<br />
									<DatePicker
										placeholderText="Sale Date"
										selected={purchaseDateVal}
										onChange={this.onProductDateChange}
										dateFormat="d-MMM-yyyy"
									/>
								</div>
							</div>
							<div className="sd-part2">
								<div className="sales-labels-part2">
									<p className="slabel">Product Quantity</p>
									<p className="slabel">Product Price</p>
									<p className="slabel">Total Amount to be paid</p>
									<p className="slabel">Payment Option</p>
									<p className="slabel">Transaction Id</p>
								</div>
								<div className="sales-text-part2">
									<input
										className="stextbox"
										required="required"
										type="text"
										onChange={this.onQuantityChange}
										title="Enter numbers only."
										pattern="[\d]{0-9}{1,5}"
										id="quantity"
										value={quantityVal}
									/>
									<br />
									<input
										className="stextbox-price"
										type="text"
										value={productPrice ? productPrice.price : ''}
										readOnly
									/>
									<br />
									<input
										className="stextbox-total"
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
											className="cash-sradio"
											required
											onClick={this.onPaymentModeChange}
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
											className="cashless-sradio"
											onClick={this.onPaymentModeChange}
										/>
										<label for="cashless" className="cashless-text">
											Cashless
										</label>
									</div>
									<input
										className="stextbox"
										type="text"
										onChange={this.onTransactionChange}
										value={transactionId}
									/>
								</div>
							</div>
						</div>
						<div className="sales-btn">
							<button className="btn-submit" type="submit" onClick={this.onSubmit}>
								Submit
							</button>
							<button className="btn-cancel" type="button" onClick={this.onCancel}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default SalesDetails;
