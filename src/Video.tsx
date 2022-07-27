import {Composition} from 'remotion';
import {MyComposition} from './Composition';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="SDCalculatorWeb"
				component={MyComposition}
				durationInFrames={60}
				fps={30}
				width={800}
				height={600}
			/>
		</>
	);
};
