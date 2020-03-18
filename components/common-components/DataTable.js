import React from 'react';
import { Table } from 'semantic-ui-react';

class DataTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { data, columnHeader } = this.props;
		return (
			<div className="datatable">
				<Table celled>
					<Table.Header>
						<Table.Row>
							{columnHeader &&
								columnHeader.map(item => {
									return <Table.HeaderCell>{item}</Table.HeaderCell>;
								})}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row></Table.Row>
					</Table.Body>
				</Table>
			</div>
		);
	}
}

export default DataTable;
