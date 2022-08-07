import {Card} from './Card';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const CardList: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const margin = interpolate(frame, [0, durationInFrames], [-500 * 5, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<div
			className={`w-full px-4 flex flex-row bg-white flex-wrap gap-6 justify-center align-top items-center`}
			style={{marginTop: margin}}
		>
			{[...Array(50)].map((_, i) => {
				return <Card key={i} cardId={i * 10} />;
			})}
		</div>
	);
};
