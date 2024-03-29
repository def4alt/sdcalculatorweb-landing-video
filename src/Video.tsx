import {Composition} from 'remotion';
import {MyComposition} from './Composition';

import './style.css';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="SDCalculatorWeb"
				component={MyComposition}
				durationInFrames={600}
				fps={30}
				width={1280}
				height={720}
			/>
		</>
	);
};
