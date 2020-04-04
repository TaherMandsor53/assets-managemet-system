import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import transform from '../../utils/transform';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import columnConstant from '../../constants/constants';
import DataTable from '../common-components/DataTable';
import MessageComponent from '../common-components/MessageComponent';

class PurchaseDetails extends React.Component {
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
			modalOpen: false,
		};
	}

	componentDidMount() {
		const { requestProductDetails, requestProductTypeDetails, requestPurchaseDetails } = this.props;
		requestProductDetails(); //fetching product Details
		requestProductTypeDetails(); // fetching Product Type details
		requestPurchaseDetails(); // fetching Purchase Details
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
		let price = document.getElementsByClassName('ptextbox-price')[0].value;
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

	onModalClose = () => {
		this.setState({ modalOpen: false });
		this.props.requestPurchaseDetails();
	};

	onSubmit = () => {
		// document.getElementById('cash').removeAttribute('required');
		// document.getElementById('cashless').removeAttribute('required');
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
		let dbFormatDate = moment(purchaseDateVal).format('YYYY-MM-DD');
		this.props.insertPurchaseDetails(
			purchaseId,
			productVal,
			quantityVal,
			totalAmtVal,
			vendorName,
			paymentMode,
			transactionId,
			dbFormatDate,
		);
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
			modalOpen: true,
		});

		document.getElementById('cash').checked = false;
		document.getElementById('cashless').checked = false;
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
			modalOpen,
		} = this.state;
		const transformProductTypeDetails = transform.transformProductType(productTypeDetails && productTypeDetails);
		let productFilter = productDetails && productDetails.filter(item => item.productTypeId === selectedTypeId);
		const transformFilterProduct = transform.transformFilterProduct(productFilter);
		let productPrice = productFilter && productFilter.find(item => item.productId === productVal);

		const transformPurchaseDetails = transform.transformPurchaseDetails(purchaseDetails, productDetails);
		return (
			<Fragment>
				<div className="purchase-details">
					<form method="post" action="/">
						<div className="purchase-details-form">
							<div className="pd-part1">
								<div className="purchase-labels-part1">
									<p className="plabel">Bill No</p>
									<p className="plabel">Vendor Name</p>
									<p className="plabel">Product Type</p>
									<p className="plabel">Product Name</p>
									<p className="plabel">Purchase Date</p>
								</div>
								<div className="purchase-text-part1">
									<input
										className="ptextbox"
										required
										type="text"
										onChange={this.onBillNoChange}
										value={purchaseId}
										id="pid"
									/>
									<br />
									<input
										className="ptextbox"
										required
										type="text"
										onChange={this.onVendorNameChange}
										value={vendorName}
										id="vName"
									/>
									<br />
									<Dropdown
										selection
										options={transformProductTypeDetails}
										placeholder="Product Category"
										className="pdropdown"
										onChange={this.onProductTypeChange}
										value={selectedTypeId}
									/>
									<br />
									<Dropdown
										selection
										options={transformFilterProduct}
										placeholder="Product"
										className="pdropdown"
										onChange={this.onProductChange}
										value={productVal}
									/>
									<br />
									<DatePicker
										placeholderText="Purchase Date"
										selected={purchaseDateVal}
										onChange={this.onProductDateChange}
										dateFormat="d-MMM-yyyy"
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
											className="cashless-pradio"
											onClick={this.onPaymentModeChange}
										/>
										<label for="cashless" className="cashless-text">
											Cashless
										</label>
									</div>
									<input
										className="ptextbox"
										type="text"
										onChange={this.onTransactionChange}
										value={transactionId}
									/>
								</div>
							</div>
						</div>
						<div className="purchase-btn">
							<button className="btn-submit" type="submit" onClick={this.onSubmit}>
								Submit
							</button>
							<button className="btn-cancel" type="button" onClick={this.onCancel}>
								Cancel
							</button>
						</div>
					</form>
				</div>
				<DataTable
					columnHeader={columnConstant.purchaseDetailsColumnHeader}
					tableData={transformPurchaseDetails}
					showIcon="purchaseId"
				/>
				<MessageComponent
					modalOpen={modalOpen}
					modalHeader="Purchase Details"
					modalContent="Purchase details added successfully"
					onClose={this.onModalClose}
				/>
			</Fragment>
		);
	}
}

export default PurchaseDetails;
