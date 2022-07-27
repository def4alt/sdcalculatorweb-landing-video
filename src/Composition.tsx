import {useCurrentFrame} from 'remotion';
import {Chart} from './components/Chart';

export const MyComposition = () => {
	const frame = useCurrentFrame();

	return (
		<div>
			<Chart chart_id={1} />
		</div>
	);
};
