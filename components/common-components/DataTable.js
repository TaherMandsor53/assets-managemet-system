import React from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

class DataTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			column: null,
			direction: null,
			data: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tableData !== this.props.tableData) {
			this.setState({ data: nextProps.tableData });
		}
	}

	// renderCells(data, columnHeader) {
	// 	return columnHeader.map((col, index) => <Table.Cell key={index}>{data[col.id]}</Table.Cell>);
	// }

	handleSort = clickedColumn => () => {
		const { column, data, direction } = this.state;

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			});

			return;
		}

		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		});
	};

	render() {
		const { data, direction, column } = this.state;
		const { columnHeader, showIconId } = this.props;
		return (
			<div className="datatable">
				<Table celled sortable>
					<Table.Header>
						<Table.Row>
							{columnHeader &&
								columnHeader.map(item => {
									return (
										<Table.HeaderCell
											sorted={
												column === item.id
													? direction
													: item.id === showIconId
													? 'ascending'
													: null
											}
											onClick={this.handleSort(item.id)}
										>
											{item.value}
										</Table.HeaderCell>
									);
								})}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{data &&
							data.map((row, index) => {
								return (
									<Table.Row key={index}>
										{columnHeader.map((col, index) => (
											<Table.Cell key={index}>{row[col.id]}</Table.Cell>
										))}
									</Table.Row>
								);
							})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}

export default DataTable;
