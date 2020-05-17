import React from 'react';
import drilldown from 'highcharts/modules/drilldown.js';
import Highcharts from 'highcharts';
drilldown(Highcharts);

class PieChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate() {
		this.renderPieChart();
	}

	renderPieChart = () => {
		// Create the chart
		const { chartProductType } = this.props;
		Highcharts.chart('container', {
			chart: {
				type: 'pie',
			},
			title: {
				text: 'Stock details',
			},
			subtitle: {
				text: 'Available stock details of individual product',
			},
			credits: {
				enabled: false,
			},

			accessibility: {
				announceNewData: {
					enabled: true,
				},
				point: {
					valueSuffix: '%',
				},
			},

			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '{point.name}: {point.y}',
					},
				},
			},

			tooltip: {
				headerFormat: '<span style="font-size:12px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
			},

			series: [
				{
					name: 'Stock details',
					colorByPoint: true,
					data: chartProductType,
				},
			],

			drilldown: {
				series: chartProductType,
			},
		});
	};

	render() {
		return (
			<figure class="highcharts-figure">
				<div id="container"></div>
			</figure>
		);
	}
}

export default PieChart;
