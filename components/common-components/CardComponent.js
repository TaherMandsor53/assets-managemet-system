import React from 'react';
import { Card } from 'semantic-ui-react';

class CardComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { headerName, description, cardClass } = this.props;
		return (
			<div>
				<Card header={headerName} description={description} className={cardClass} />
			</div>
		);
	}
}

export default CardComponent;
