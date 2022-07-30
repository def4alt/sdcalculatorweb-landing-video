import {Card} from './Card';
import '../styles/card-list.css';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const CardList: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const margin = interpolate(frame, [0, durationInFrames], [-500 * 5, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<div className="card-list" style={{marginTop: margin}}>
			{[...Array(50)].map((_, i) => {
				return <Card card_id={i * 10} key={i} />;
			})}
		</div>
	);
};
