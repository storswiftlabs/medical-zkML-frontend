import React from 'react';
import CheckUpCard from './CheckUpCard';
import { Button, Divider } from '@nextui-org/react';
import { FriendSvg, MySvg } from '@/components/Icon/AcmeLogo';

function Patient({ paginate }: { paginate: (newDirection: number) => void }) {
	const onSubmit = () => {
		paginate(1);
	};

	const onBack = () => {
		paginate(-1);
	};
	return (
		<div className='flex flex-col h-full w-full'>
			<div className='flex justify-center items-center h-full gap-28'>
				<div onClick={onSubmit}>
					<CheckUpCard>
						{MySvg}
						<span className='mt-[1rem]'>Myself</span>
					</CheckUpCard>
				</div>
				<div onClick={onSubmit}>
					<CheckUpCard>
						{FriendSvg}
						<span className='mt-[1rem]'>Someone else</span>
					</CheckUpCard>
				</div>
			</div>
			<div className='h-[4.6rem]'>
				<Divider />
				<div className='flex items-center justify-between p-4'>
					<Button onPress={onBack} radius='sm' color='primary'>
						Back
					</Button>
					{/* <Button type='submit' onPress={onSubmit} radius='sm' color='primary'>
						Next
					</Button> */}
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Patient;
