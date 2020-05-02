import React from 'react';
import { Card } from 'semantic-ui-react';

class CardComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { headerName, description, cardClass, profitLossCheck } = this.props;
		return (
			<div className={cardClass}>
				<div className="card-header">{headerName}</div>
				<div className="card-description" dangerouslySetInnerHTML={{ __html: description }}></div>
			</div>
		);
	}
}

export default CardComponent;
