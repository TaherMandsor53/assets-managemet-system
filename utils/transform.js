const transformProductType = data => {
	return (
		data &&
		data.map(item => {
			return {
				text: item.productType,
				value: item.productTypeId,
			};
		})
	);
};

export default {
	transformProductType,
};
