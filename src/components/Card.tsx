import moment, {relativeTimeRounding} from 'moment';
import React, {useMemo} from 'react';
import {random} from 'remotion';
import {checkWestgardViolations} from '../utils/westgard';
import {Chart} from './Chart';

import '../styles/card.css';

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

export const Card: React.FC<{card_id: number}> = ({card_id}) => {
	const width = 400;
	const height = 250;
	const average = (random(card_id) * 100) % 100;
	const sd = average / 5;
	const values = [average].concat(
		[...Array(7)].map((_, i) => {
			return (
				(random(card_id + i + 1) * (average + 3 * sd) + (average - 3 * sd)) %
				100
			);
		})
	);
	let violations = checkWestgardViolations(values, average, sd);
	const labels = [...Array(8)].map(
		(_, i) =>
			moment(randomDate(card_id + i))
				.format('DD/MM/YY')
				.toLocaleString() +
			';' +
			violations.at(i)
	);
	const title = titles.at((random(card_id) * titles.length) % 10);

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

	return (
		<div className={hasWarning ? 'card card_red' : 'card'}>
			<div className="card__header">
				<div className="card__title">{title}</div>
			</div>
			<div className="card__chart">
				<Chart data={data} />
			</div>
		</div>
	);
};
