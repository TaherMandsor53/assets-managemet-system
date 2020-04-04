import React, { Fragment } from 'react';
import { Modal, ModalActions, Button } from 'semantic-ui-react';

class MessageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { modalOpen, modalHeader, modalContent, onClose } = this.props;
		return (
			<Fragment>
				<Modal size="small" open={modalOpen}>
					<Modal.Header>{modalHeader}</Modal.Header>
					<Modal.Content>
						<p>{modalContent}</p>
					</Modal.Content>
					<ModalActions>
						<Button content="OK" icon="checkmark" labelPosition="right" positive onClick={onClose} />
					</ModalActions>
				</Modal>
			</Fragment>
		);
	}
}

export default MessageComponent;
