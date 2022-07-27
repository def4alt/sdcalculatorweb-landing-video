import React, {useMemo} from 'react';
import {
	Chart as ChartJS,
	Title,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ChartOptions,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {random, useVideoConfig} from 'remotion';
import moment from 'moment';

ChartJS.register(Title, CategoryScale, LinearScale, PointElement, LineElement);

const randomDate = (id: number) => {
	const startDate = new Date(new Date().getFullYear(), 1, 1);
	const endDate = new Date();

	return new Date(
		startDate.getTime() + random(id) * (endDate.getTime() - startDate.getTime())
	);
};

const titles = [
	'Arg Lvl1',
	'5-Oxo Pro Lvl2',
	'Asp Lvl1',
	'Gly Lvl2',
	'Met Lvl1',
	'Orn Lvl2',
	'Tyr Lvl1',
	'Val Lvl1',
	'C10:1 Lvl2',
	'C14 OH Lvl1',
	'C16:1 Lvl1',
	'C18:1 Lvl1',
	'C18:1 OH Lvl2',
	'C8 Lvl1',
	'C2 Lvl1',
	'Pro Lvl2',
	'Ser Lvl2',
];

export const Chart: React.FC<{chart_id: number}> = ({chart_id}) => {
	const {width, height} = useVideoConfig();
	const average = (random(chart_id) * 100) % 100;
	const SD = average / 5;
	const labels = [...Array(8)].map((i) =>
		moment(randomDate(chart_id + i))
			.format('DD/MM/YY')
			.toLocaleString()
	);
	const values = [average].concat(
		[...Array(7)].map((_, i) => {
			return (
				(random(chart_id + i + 1) * (average + 3 * SD) + (average - 3 * SD)) %
				100
			);
		})
	);
	const title = titles.at((random(chart_id) * titles.length) % 10);

	const options: ChartOptions<'line'> = useMemo(() => {
		return {
			responsive: false,
			animation: false,
			plugins: {
				title: {
					display: true,
					text: title,
					font: {
						size: 22,
					},
				},
			},
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
					},
					grid: {
						display: false,
					},
				},
				y: {
					min: average - 4 * SD,
					max: average + 4 * SD,
					ticks: {
						stepSize: SD,
						callback: (tickValue: string | number) => {
							let value = Number(tickValue);
							if (value == average) {
								return Math.floor(value * 100) / 100 + ', M';
							}
							return (
								Math.floor(value * 100) / 100 +
								', ' +
								Math.abs(value - average) / SD +
								'SD'
							);
						},
					},

					grid: {
						drawBorder: true,
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

	const data = {
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
	return <Line options={options} data={data} width={width} height={height} />;
};
