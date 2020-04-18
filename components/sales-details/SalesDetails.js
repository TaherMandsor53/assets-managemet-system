import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import transform from '../../utils/transform';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import columnConstant from '../../constants/constants';
import DataTable from '../common-components/DataTable';
import MessageComponent from '../common-components/MessageComponent';

class SalesDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTypeId: '',
			salesDateVal: '',
			productVal: '',
			totalAmtVal: '',
			billNo: '',
			customerName: '',
			quantityVal: '',
			paymentMode: '',
			transactionId: '',
			custCheck: false,
			customerType: '',
			modalOpen: false,
			salesProductPrice: '',
			quantMsg: '',
			//validation errorchecks
			custTypeErrorLabel: '',
			custTypeErrorCheck: false,
			pTypeErrorLabel: '',
			pTypeErrorCheck: false,
			pNameErrorLabel: '',
			pNameErrorCheck: false,
			sDateErrorLabel: '',
			sDateErrorCheck: false,
			pQuantityErrorLabel: '',
			pQuantityErrorCheck: false,
			paymentErrorLabel: '',
			paymentErrorCheck: false,
			salesPriceLabel: '',
			salesPriceCheck: false,
		};
	}

	componentDidMount() {
		const {
			requestProductDetails,
			requestProductTypeDetails,
			requestSalesDetails,
			requestPurchaseDetails,
		} = this.props;
		requestProductDetails(); //fetching product Details
		requestProductTypeDetails(); // fetching Product Type details
		requestSalesDetails(); // fetching sales details
		requestPurchaseDetails(); // fetching Purchase Details
	}

	onProductTypeChange = (event, data) => {
		this.setState({ selectedTypeId: data.value });
		document.getElementById('quantity').value = '';
		document.getElementById('quantity').placeholder = '';
	};

	onProductDateChange = date => {
		this.setState({ salesDateVal: date });
	};

	onProductChange = (event, data) => {
		this.setState({ productVal: data.value });
		document.getElementById('quantity').value = '';
	};

	onSalesPriceChange = event => {
		let salesPrice = event.target.value.replace(/[^0-9]/g, '');
		this.setState({ salesProductPrice: salesPrice });
	};

	onQuantityChange = event => {
		let quantity = event.target.value;
		let totalAmount = this.state.salesProductPrice * quantity;
		this.setState({ totalAmtVal: totalAmount, quantityVal: quantity });
	};

	onBillNoChange = event => {
		this.setState({ billNo: event.target.value });
	};

	onCustomerNameChange = event => {
		this.setState({ customerName: event.target.value });
	};

	onPaymentModeChange = event => {
		this.setState({ paymentMode: event.target.value });
		if (event.target.value) {
			this.setState({ paymentErrorLabel: '', paymentErrorCheck: false });
		}
	};

	onTransactionChange = event => {
		this.setState({ transactionId: event.target.value });
	};

	onCustomerTypeCheck = event => {
		if (event.target.value === '2') {
			document.getElementById('billNo').readOnly = true;
			document.getElementById('custName').readOnly = true;
			this.setState({
				custCheck: true,
				customerType: event.target.value,
				custTypeErrorCheck: false,
				custTypeErrorLabel: '',
			});
		} else {
			document.getElementById('billNo').readOnly = false;
			document.getElementById('custName').readOnly = false;
			this.setState({
				custCheck: false,
				customerType: event.target.value,
				custTypeErrorCheck: false,
				custTypeErrorLabel: '',
			});
		}
	};

	onModalClose = () => {
		this.setState({ modalOpen: false });
		this.props.requestSalesDetails();
	};

	onSubmit = () => {
		const {
			billNo,
			customerName,
			productVal,
			salesDateVal,
			quantityVal,
			totalAmtVal,
			paymentMode,
			transactionId,
			customerType,
			selectedTypeId,
			salesProductPrice,
		} = this.state;

		if (
			customerType.length > 0 &&
			selectedTypeId &&
			productVal.length > 0 &&
			salesDateVal &&
			quantityVal.length > 0 &&
			paymentMode.length > 0 &&
			salesProductPrice.length > 0
		) {
			const { insertSalesDetails } = this.props;
			let dbFormat = moment(salesDateVal).format('YYYY-MM-DD');
			insertSalesDetails(
				billNo,
				productVal,
				quantityVal,
				totalAmtVal,
				customerName,
				dbFormat,
				customerType,
				paymentMode,
				transactionId,
			);
			this.setState({
				billNo: '',
				productVal: '',
				quantityVal: '',
				totalAmtVal: '',
				customerName: '',
				paymentMode: '',
				transactionId: '',
				salesDateVal: '',
				selectedTypeId: '',
				salesProductPrice: '',
				modalOpen: true,
				custTypeErrorLabel: '',
				custTypeErrorCheck: false,
				pTypeErrorLabel: '',
				pTypeErrorCheck: false,
				pNameErrorLabel: '',
				pNameErrorCheck: false,
				sDateErrorLabel: '',
				sDateErrorCheck: false,
				pQuantityErrorLabel: '',
				pQuantityErrorCheck: false,
				paymentErrorLabel: '',
				paymentErrorCheck: false,
				custCheck: false,
				salesPriceLabel: '',
				salesPriceCheck: false,
			});
			document.getElementById('cash').checked = false;
			document.getElementById('cashless').checked = false;
			document.getElementById('registered').checked = false;
			document.getElementById('unregistered').checked = false;
			document.getElementById('billNo').readOnly = false;
			document.getElementById('custName').readOnly = false;
		} else {
			this.setState({
				custTypeErrorLabel: 'Please select any option',
				custTypeErrorCheck: true,
				pTypeErrorLabel: 'Product Type is Mandatory',
				pTypeErrorCheck: true,
				pNameErrorLabel: 'Product Name is Mandatory',
				pNameErrorCheck: true,
				sDateErrorLabel: 'Please select any date',
				sDateErrorCheck: true,
				pQuantityErrorLabel: 'Product Quantity is Mandatory',
				pQuantityErrorCheck: true,
				paymentErrorLabel: 'Please select any option',
				paymentErrorCheck: true,
				salesPriceLabel: 'Sales Price is Mandatory',
				salesPriceCheck: true,
			});
		}
	};

	onCancel = () => {
		this.setState({
			billNo: '',
			productVal: '',
			quantityVal: '',
			totalAmtVal: '',
			customerName: '',
			paymentMode: '',
			transactionId: '',
			salesDateVal: '',
			selectedTypeId: '',
			custTypeErrorLabel: '',
			salesProductPrice: '',
			custTypeErrorCheck: false,
			pTypeErrorLabel: '',
			pTypeErrorCheck: false,
			pNameErrorLabel: '',
			pNameErrorCheck: false,
			sDateErrorLabel: '',
			sDateErrorCheck: false,
			pQuantityErrorLabel: '',
			pQuantityErrorCheck: false,
			paymentErrorLabel: '',
			paymentErrorCheck: false,
			salesPriceLabel: '',
			salesPriceCheck: false,
		});
		document.getElementById('cash').checked = false;
		document.getElementById('cashless').checked = false;
		document.getElementById('registered').checked = false;
		document.getElementById('unregistered').checked = false;
	};

	calculateTotalQuantity = data => {
		return data && data.map(item => item.quantity).reduce((prev = 0, next = 0) => prev + next);
	};

	calculateQuantityMessage = totalQuant => {
		let quantMsg = '';
		if (totalQuant === 0) {
			quantMsg = 'Product is currently out of stock: ' + totalQuant;
		} else if (totalQuant >= 1 && totalQuant <= 10) {
			quantMsg = 'Please place an order : ' + totalQuant;
		} else if (totalQuant === false) {
			quantMsg = '';
		} else {
			quantMsg = 'Available product stock: ' + totalQuant;
		}
		return quantMsg;
	};

	render() {
		const { productTypeDetails, productDetails, salesDetails, purchaseDetails } = this.props;
		const {
			selectedTypeId,
			salesDateVal,
			productVal,
			salesProductPrice,
			totalAmtVal,
			customerName,
			quantityVal,
			billNo,
			transactionId,
			custCheck,
			modalOpen,
			custTypeErrorLabel,
			pTypeErrorLabel,
			pTypeErrorCheck,
			pNameErrorLabel,
			pNameErrorCheck,
			sDateErrorLabel,
			sDateErrorCheck,
			pQuantityErrorLabel,
			pQuantityErrorCheck,
			paymentErrorLabel,
			salesPriceLabel,
			salesPriceCheck,
		} = this.state;
		const transformProductTypeDetails = transform.transformProductType(productTypeDetails && productTypeDetails);
		let productFilter = productDetails && productDetails.filter(item => item.productTypeId === selectedTypeId);
		const transformFilterProduct = transform.transformFilterProduct(productFilter);
		let productPrice = productFilter && productFilter.find(item => item.productId === productVal);

		//Total Quantity Calculation
		let filterProductQuantity = purchaseDetails && purchaseDetails.filter(item => item.productId === productVal);
		console.log('Total product Quantity:', filterProductQuantity);
		let totalProductQuantity = this.calculateTotalQuantity(
			filterProductQuantity.length > 0 && filterProductQuantity,
		);
		console.log('Total Quant:', totalProductQuantity);
		let quantMsg = this.calculateQuantityMessage(totalProductQuantity);

		const transformSalesDetails = transform.transformSalesDetails(salesDetails, productDetails);

		return (
			<Fragment>
				<div className="sales-details">
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
										className="registered-sradio"
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
										className="unregistered-sradio"
										onClick={this.onCustomerTypeCheck}
									/>
									<label for="unregistered" className="unregistered-text">
										Unregistered
									</label>
									<span className="custErrorLabel">{custTypeErrorLabel}</span>
								</div>

								<input
									className={custCheck ? 'stextbox-billNo' : 'stextbox'}
									type="text"
									onChange={this.onBillNoChange}
									value={billNo}
									id="billNo"
								/>
								<br />
								<input
									className={custCheck ? 'stextbox-custName' : 'stextbox'}
									type="text"
									onChange={this.onCustomerNameChange}
									value={customerName}
									id="custName"
								/>
								<br />
								<Dropdown
									selection
									options={transformProductTypeDetails}
									placeholder={pTypeErrorCheck ? pTypeErrorLabel : 'Product Category'}
									className={pTypeErrorCheck ? 'sdropdown-error' : 'sdropdown'}
									onChange={this.onProductTypeChange}
									value={selectedTypeId}
								/>
								<br />
								<Dropdown
									selection
									options={transformFilterProduct}
									placeholder={pNameErrorCheck ? pNameErrorLabel : 'Product'}
									className={pNameErrorCheck ? 'sdropdown-error' : 'sdropdown'}
									onChange={this.onProductChange}
									value={productVal}
								/>
								<br />
								<DatePicker
									placeholderText={sDateErrorCheck ? sDateErrorLabel : 'Sale Date'}
									selected={salesDateVal}
									onChange={this.onProductDateChange}
									dateFormat="d-MMM-yyyy"
									className={sDateErrorCheck && 'sDate-error'}
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
									className={pQuantityErrorCheck ? 'stext-error' : 'stextbox'}
									onChange={this.onQuantityChange}
									id="quantity"
									value={quantityVal}
									placeholder={pQuantityErrorCheck ? pQuantityErrorLabel : quantMsg}
								/>
								<br />
								<input
									className={salesPriceCheck ? 'stext-error' : 'stextbox'}
									value={salesProductPrice}
									onChange={this.onSalesPriceChange}
									placeholder={
										salesPriceCheck
											? salesPriceLabel
											: productPrice
											? 'Product purchase price: ' + productPrice.price
											: ''
									}
								/>
								<br />
								<input
									className="stextbox-total"
									type="text"
									readOnly
									value={totalAmtVal ? totalAmtVal : ''}
								/>
								<div className={'payment-mode'}>
									<input
										type="radio"
										id="cash"
										name="payment"
										value="1"
										className="cash-sradio"
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
										className="cashless-sradio"
										onClick={this.onPaymentModeChange}
									/>
									<label for="cashless" className="cashless-text">
										Cashless
									</label>
									<span className="paymentErrorLabel">{paymentErrorLabel}</span>
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
				</div>
				<DataTable
					columnHeader={columnConstant.salesDetailsColumnHeader}
					tableData={transformSalesDetails}
					showIcon="custType"
				/>
				<MessageComponent
					modalOpen={modalOpen}
					modalHeader="Sales Details"
					modalContent="Sales details added successfully"
					onClose={this.onModalClose}
				/>
			</Fragment>
		);
	}
}

export default SalesDetails;
