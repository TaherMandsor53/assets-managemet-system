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
			//Error Labels
			pIdErrorLabel: '',
			pIdErrorCheck: false,
			vNameErrorLabel: '',
			vNameErrorCheck: false,
			pTypeErrorLabel: '',
			pTypeErrorCheck: false,
			pNameErrorLabel: '',
			pNameErrorCheck: false,
			pDateErrorLabel: '',
			pDateErrorCheck: false,
			pQuantityErrorLabel: '',
			pQuantityErrorCheck: false,
			paymentErrorLabel: '',
			paymentErrorCheck: false,
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
		let quantity = event.target.value.replace(/[^0-9]/g, '');
		let price = document.getElementsByClassName('ptextbox-price')[0].value;
		let totalAmount = price * quantity;
		this.setState({ totalAmtVal: totalAmount, quantityVal: quantity });
	};

	onBillNoChange = event => {
		this.setState({ purchaseId: event.target.value });
	};

	onVendorNameChange = event => {
		this.setState({ vendorName: event.target.value });
	};

	onPaymentModeChange = event => {
		this.setState({ paymentMode: event.target.value });
		if (event.target.value) {
			this.setState({ paymentErrorCheck: false, paymentErrorLabel: '' });
		}
	};

	onTransactionChange = event => {
		this.setState({ transactionId: event.target.value });
	};

	onModalClose = () => {
		this.setState({ modalOpen: false });
		this.props.requestPurchaseDetails();
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
			selectedTypeId,
		} = this.state;
		if (
			purchaseId.length > 0 &&
			vendorName.length > 0 &&
			selectedTypeId &&
			productVal.length > 0 &&
			purchaseDateVal &&
			quantityVal.length > 0 &&
			paymentMode.length > 0
		) {
			this.setState({
				pIdErrorLabel: '',
				pIdErrorCheck: false,
				vNameErrorLabel: '',
				vNameErrorCheck: false,
				pTypeErrorLabel: '',
				pTypeErrorCheck: false,
				pNameErrorLabel: '',
				pNameErrorCheck: false,
				pDateErrorLabel: '',
				pDateErrorCheck: false,
				pQuantityErrorLabel: '',
				pQuantityErrorCheck: false,
				paymentErrorLabel: '',
				paymentErrorCheck: false,
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
			document.getElementById('cash').checked = false;
			document.getElementById('cashless').checked = false;
		} else {
			this.setState({
				pIdErrorLabel: 'Product Id is Mandatory',
				pIdErrorCheck: true,
				vNameErrorLabel: 'Vendor name is Mandatory',
				vNameErrorCheck: true,
				pTypeErrorLabel: 'Product type is Mandatory',
				pTypeErrorCheck: true,
				pNameErrorLabel: 'Product name is Mandatory',
				pNameErrorCheck: true,
				pDateErrorLabel: 'Please select any date',
				pDateErrorCheck: true,
				pQuantityErrorLabel: 'Product quantity is Mandatory',
				pQuantityErrorCheck: true,
				paymentErrorLabel: 'Please select any option',
				paymentErrorCheck: true,
			});
		}
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
			pIdErrorLabel: '',
			pIdErrorCheck: false,
			vNameErrorLabel: '',
			vNameErrorCheck: false,
			pTypeErrorLabel: '',
			pTypeErrorCheck: false,
			pNameErrorLabel: '',
			pNameErrorCheck: false,
			pDateErrorLabel: '',
			pDateErrorCheck: false,
			pQuantityErrorLabel: '',
			pQuantityErrorCheck: false,
			paymentErrorLabel: '',
			paymentErrorCheck: false,
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
			pIdErrorLabel,
			pIdErrorCheck,
			vNameErrorLabel,
			vNameErrorCheck,
			pTypeErrorLabel,
			pTypeErrorCheck,
			pNameErrorLabel,
			pNameErrorCheck,
			pDateErrorLabel,
			pDateErrorCheck,
			pQuantityErrorLabel,
			pQuantityErrorCheck,
			paymentErrorLabel,
			paymentErrorCheck,
		} = this.state;
		const transformProductTypeDetails = transform.transformProductType(productTypeDetails && productTypeDetails);
		let productFilter = productDetails && productDetails.filter(item => item.productTypeId === selectedTypeId);
		const transformFilterProduct = transform.transformFilterProduct(productFilter);
		let productPrice = productFilter && productFilter.find(item => item.productId === productVal);

		const transformPurchaseDetails = transform.transformPurchaseDetails(purchaseDetails, productDetails);
		return (
			<Fragment>
				<div className="purchase-details">
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
									className={pIdErrorCheck ? 'ptext-error' : 'ptextbox'}
									type="text"
									onChange={this.onBillNoChange}
									value={purchaseId}
									id="pid"
									placeholder={pIdErrorLabel}
								/>
								<br />
								<input
									className={vNameErrorCheck ? 'ptext-error' : 'ptextbox'}
									type="text"
									onChange={this.onVendorNameChange}
									value={vendorName}
									id="vName"
									placeholder={vNameErrorLabel}
								/>
								<br />
								<Dropdown
									selection
									options={transformProductTypeDetails}
									placeholder={pTypeErrorCheck ? pTypeErrorLabel : 'Product Category'}
									className={pTypeErrorCheck ? 'pdropdown-error' : 'pdropdown'}
									onChange={this.onProductTypeChange}
									value={selectedTypeId}
								/>
								<br />
								<Dropdown
									selection
									options={transformFilterProduct}
									placeholder={pNameErrorCheck ? pNameErrorLabel : 'Product'}
									className={pNameErrorCheck ? 'pdropdown-error' : 'pdropdown'}
									onChange={this.onProductChange}
									value={productVal}
								/>
								<br />
								<DatePicker
									placeholderText={pDateErrorCheck ? pDateErrorLabel : 'Purchase Date'}
									selected={purchaseDateVal}
									onChange={this.onProductDateChange}
									dateFormat="d-MMM-yyyy"
									className={pDateErrorCheck && 'pDate-error'}
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
									className={pQuantityErrorCheck ? 'ptext-error' : 'ptextbox'}
									onChange={this.onQuantityChange}
									id="quantity"
									value={quantityVal}
									placeholder={pQuantityErrorLabel}
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
										className="cash-pradio"
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
										className="cashless-pradio"
										onClick={this.onPaymentModeChange}
									/>
									<label for="cashless" className="cashless-text">
										Cashless
									</label>
									<span className="pradio-errorLabel">{paymentErrorLabel}</span>
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
