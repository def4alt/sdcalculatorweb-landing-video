import moment from 'moment';
import React, {useMemo} from 'react';
import {random} from 'remotion';
import {checkWestgardViolations} from '../utils/westgard';
import {Chart} from './Chart';

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

export const Card: React.FC<{cardId: number}> = ({cardId}) => {
	const width = 400;
	const height = 250;
	const average = (random(cardId) * 100) % 100;
	const sd = average / 5;
	const amount = 8;
	console.log(amount);
	const values = useMemo(
		() =>
			[average].concat(
				[...Array(amount - 1)].map((_, i) => {
					return (
						(random(cardId + i + 1) * (average + 3 * sd) + (average - 2 * sd)) %
						100
					);
				})
			),
		[average, sd, cardId]
	);

	const violations = useMemo(
		() => checkWestgardViolations(values, average, sd),
		[values, average, sd]
	);

	const labels = useMemo(
		() =>
			[...Array(amount)].map(
				(_, i) =>
					moment(randomDate(cardId + i))
						.format('DD/MM/YY')
						.toLocaleString() +
					';' +
					violations.at(i)
			),
		[violations, cardId]
	);
	const title = titles.at((random(cardId) * titles.length) % 10);

	const hasWarning = useMemo(() => {
		return violations.filter((t) => t.trim() !== '').length > 0;
	}, [violations]);

	const data = {
		values,
		average,
		sd,
		labels,
		width,
		height,
	};

	const cv = useMemo(() => Math.floor((sd / average) * 100 * 100) / 100, []);

	return (
		<div
			className={`w-5/12 h-80 border-2 bg-white rounded-md flex flex-col justify-center align-middle items-center ${
				hasWarning ? 'border-red-500' : ''
			}`}
		>
			<div className="w-full flex justify-center align-middle items-center h-20">
				<p className="text-center text-lg">{title}</p>
			</div>
			<div className="w-full h-full px-4 flex justify-center align-middle items-center">
				<Chart data={data} />
			</div>
			<p className="mb-4 text-sm text-gray-500 ml-4 h-8">{`SD ${
				Math.floor(sd * 100) / 100
			} CV ${cv}`}</p>
		</div>
	);
};
