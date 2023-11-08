import { DotIcon, WarnIcon, WarnSvg } from '@/components/Icon/AcmeLogo';
import React, { useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Divider, Image } from '@nextui-org/react';

function IntroductionComponentB({ paginate }: { paginate: (newDirection: number) => void }) {
	const [selected, setSelected] = React.useState([] as string[]);
	const [isInvalid, setIsInvalid] = useState(false);

	const onSubmit = () => {
		if (selected.length < 2) {
			setIsInvalid(true);
		} else {
			// paginate(1);
		}
	};

	const onBack = () => {
		paginate(-1);
		if (isInvalid) {
			setIsInvalid(false);
		}
	};

	return (
		<div className='flex flex-col h-full'>
			<div className='flex flex-1'>
				<div className='w-[65%]'>
					<h3 className='text-[1.6rem] mb-[0.4rem]'>Check your symptoms</h3>
					<p className='leading-relaxed'>Take a short (3 min) symptom assessment. The information you give is safe and won’t be shared. Your results will include:</p>
					<ul className='p-[1rem] pl-[2rem] leading-relaxed'>
						<li className='flex gap-4'>
							<DotIcon />
							<span>
								<span className='font-semibold'>Checkup isn’t a diagnosis.</span>
								It’s only for your information and not a qualified medical opinion.
							</span>
						</li>
						<li className='flex gap-4 my-[1rem]'>
							<DotIcon />
							<span>
								<span className='font-semibold'>Checkup isn’t for emergencies.</span>
								Call your local emergency number right away when there’s a health emergency.
							</span>
						</li>
						<li className='flex gap-4'>
							<DotIcon />
							<span>
								<span className='font-semibold'>Your data is safe.</span>
								The information you give won’t be shared or used to identify you.
							</span>
						</li>
					</ul>
					<div className='pl-[2rem] leading-relaxed'>
						<CheckboxGroup
							//@ts-ignore
							isInvalid={isInvalid}
							value={selected}
							onValueChange={setSelected}
						>
							<Checkbox value='buenos-aires'>
								I read and accept
								<span
									className='text-[#1471cb] ml-1'
									onClick={() => {
										alert('0');
									}}
								>
									Terms of Service.
								</span>
							</Checkbox>
							<Checkbox value='sydney'>
								I agree for my health information to be used for the interview. More information in the
								<span
									className='text-[#1471cb] ml-1'
									onClick={() => {
										alert('1');
									}}
								>
									Privacy Policy.
								</span>
							</Checkbox>
						</CheckboxGroup>
						{isInvalid && (
							<div className='text-[0.8rem] flex relative w-[700px] text-[#f31260] items-center gap-1'>
								<WarnIcon />
								<p>Please agree to these Terms of Service and Privacy Policy and the processing of your health information.</p>
							</div>
						)}
					</div>
				</div>
				<div className='flex-1'>
					<WarnSvg />
				</div>
			</div>
			<div className='h-[4.6rem]'>
				<Divider />
				<div className='flex items-center justify-between p-4'>
					<Button onPress={onBack} radius='sm' color='primary'>
						Back
					</Button>
					<Button type='submit' onPress={onSubmit} radius='sm' color='primary'>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
export default IntroductionComponentB;
