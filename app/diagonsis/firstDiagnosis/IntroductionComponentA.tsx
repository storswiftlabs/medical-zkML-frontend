import { AuthenticationIcon, DotIcon } from '@/components/Icon/AcmeLogo';
import React from 'react';
import { Button, Divider, Image } from '@nextui-org/react';

const DotText = ['Possible causes of symptoms.', 'Recommendations on what to do next.'];

const AboutText = ['verifiable Machine Learning models using STARKs.'];

function IntroductionComponentA({ paginate }: { paginate: (newDirection: number) => void }) {
	return (
		<div className='flex flex-col h-full'>
			<div className='flex flex-1'>
				<div className='w-[60%]'>
					<h3 className='text-[1.6rem] font-semibold mb-[0.4rem]'>Check your symptoms</h3>
					<p className='leading-relaxed'>Take a short (3 min) symptom assessment. The information you give is safe and won’t be shared. Your results will include:</p>
					<ul className='p-[1rem] pl-[2rem] leading-relaxed'>
						{DotText.map((item, index) => (
							<li key={index} className='flex gap-4'>
								<DotIcon /> <span>{item}</span>
							</li>
						))}
					</ul>
					<h3 className='mt-[2rem]'>About this symptom checker</h3>
					<div className='p-[1rem] pl-[2rem] leading-relaxed'>
						{AboutText.map((item, index) => (
							<p className='flex items-center gap-4' key={index}>
								<AuthenticationIcon />
								{item}
							</p>
						))}
					</div>
				</div>
				<div className='flex-1'>
					<Image alt='NextUI hero Image' src='https://iconfont.alicdn.com/p/illus/preview_image/WyXLRVsfNont/313e7957-74d2-4464-8cd9-df28643a2abb.png' />
					<Image
						className='mt-[3rem]'
						alt='NextUI hero Image'
						src='https://iconfont.alicdn.com/p/illus/preview_image/WyXLRVsfNont/149ff3af-46fd-45d6-b221-53eefb9d0231.png'
					/>
				</div>
			</div>
			<div className='h-[4.6rem]'>
				<Divider />
				<div className='flex items-center justify-between p-4'>
					<div></div>
					<Button onPress={() => paginate(1)} radius='sm' color='primary'>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}

export default IntroductionComponentA;
