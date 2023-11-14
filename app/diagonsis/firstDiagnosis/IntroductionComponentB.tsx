import { DotIcon, WarnIcon, WarnSvg } from '@/components/Icon/AcmeLogo';
import React, { useMemo, useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Divider, Image } from '@nextui-org/react';
import DiagnosticFramework from '@/components/DiagnosticFramework';
import PreviewWindow from './components/PreviewWindow';

function IntroductionComponentB({ paginate }: { paginate: (newDirection: number) => void }) {
	const [selected, setSelected] = React.useState([] as string[]);
	const [isInvalid, setIsInvalid] = useState(false);
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState(false);

	const onSubmit = () => {
		if (selected.length < 2) {
			setIsInvalid(true);
		} else {
			setIsInvalid(false);
			paginate(1);
		}
	};

	const onBack = () => {
		paginate(-1);
		if (isInvalid) {
			setIsInvalid(false);
		}
	};

	const showDrawer = (content: boolean) => {
		setContent(content);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<DiagnosticFramework
			headText='Check your symptoms'
			footer={
				<>
					<Button onPress={onBack} radius='sm' color='primary'>
						Back
					</Button>
					<Button type='submit' onPress={onSubmit} radius='sm' color='primary'>
						Next
					</Button>
				</>
			}
		>
			<div className='flex flex-1 p-[2rem] pt-[0]'>
				<div className='w-[65%]'>
					<p className='leading-relaxed'>Take a short (3 min) symptom assessment. The information you give is safe and won’t be shared. Your results will include:</p>
					<ul className='p-[1rem] leading-relaxed'>
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
					<div className='pl-[1rem] leading-relaxed'>
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
									onClick={(e) => {
										e.preventDefault();
										showDrawer(true);
									}}
								>
									Terms of Service.
								</span>
							</Checkbox>
							<Checkbox value='sydney'>
								I agree for my health information to be used for the interview. More information in the
								<span
									className='text-[#1471cb] ml-1'
									onClick={(e) => {
										e.preventDefault();
										showDrawer(false);
									}}
								>
									Privacy Policy.
								</span>
							</Checkbox>
						</CheckboxGroup>
						{isInvalid && (
							<div className='text-[0.8rem] flex relative w-[700px] text-[#f31260] items-center gap-1'>
								<WarnIcon fill='#fa514f' />
								<p>Please agree to these Terms of Service and Privacy Policy and the processing of your health information.</p>
							</div>
						)}
					</div>
				</div>
				<div className='flex-1'>
					<WarnSvg />
				</div>
				<PreviewWindow
					headChildren={
						<div>
							<h2 className='text-[1.8rem]'>{content ? 'Terms of Service' : 'Privacy Policy'}</h2>
							<h2 className='text-[1.2rem]'>Last updated: 9/19/2022</h2>
						</div>
					}
					contentChildren={
						<>Consultation is recommended because of the health background and symptoms you have declared, as well as possible conditions they may indicate.</>
					}
					onClose={onClose}
					isOpen={open}
				/>
			</div>
		</DiagnosticFramework>
	);
}
export default IntroductionComponentB;
