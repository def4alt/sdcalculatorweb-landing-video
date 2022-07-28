import React, {useMemo} from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ChartOptions,
	CoreScaleOptions,
	Scale,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const Chart: React.FC<{
	data: {
		values: number[];
		labels: string[];
		average: number;
		sd: number;
		width: number;
		height: number;
	};
}> = ({data}) => {
	const {values, labels, average, sd, width, height} = data;

	const options: ChartOptions<'line'> = useMemo(() => {
		return {
			responsive: false,
			animation: false,
			datasets: {
				line: {
					borderWidth: 4,
				},
			},
			scales: {
				x: {
					ticks: {
						minRotation: 0,
						maxRotation: 90,
						callback: function (
							this: Scale<CoreScaleOptions>,
							tickValue: string | number
						) {
							let value = Number(tickValue);
							let label = this.getLabelForValue(value);
							return label.split(';')[0];
						},
					},
					grid: {
						display: false,
					},
				},
				xAxisViolations: {
					type: 'category',
					grid: {drawOnChartArea: false},
					ticks: {
						callback: function (
							this: Scale<CoreScaleOptions>,
							tickValue: string | number
						) {
							let value = Number(tickValue);
							let label = this.getLabelForValue(value);
							return label.split(';')[1];
						},
						color: '#c62828',
						font: {
							size: 15,
						},
					},
				},
				y: {
					min: average - 4 * sd,
					max: average + 4 * sd,
					ticks: {
						stepSize: sd,
						callback: (tickValue: string | number) => {
							let value = Number(tickValue);
							if (value == average) {
								return Math.floor(value * 100) / 100 + ', M';
							}
							return (
								Math.floor(value * 100) / 100 +
								', ' +
								Math.floor(Math.abs(value - average) / sd) +
								'SD'
							);
						},
					},

					grid: {
						drawBorder: false,
						color: [
							'#fffff',
							'#e84393',
							'#00cec9',
							'#ff7675',
							'#6c5ce7',
							'#ff7675',
							'#00cec9',
							'#e84393',
							'#fffff',
						],
						lineWidth: 1.5,
						borderDash: [8, 4],
					},
				},
			},
		};
	}, []);

	const chart_data = useMemo(() => {
		return {
			labels,
			datasets: [
				{
					label: 'Value',
					data: values,
					backgroundColor: '#d63031',
					borderColor: '#d63031',
				},
			],
		};
	}, []);

	return (
		<Line options={options} data={chart_data} width={width} height={height} />
	);
};
