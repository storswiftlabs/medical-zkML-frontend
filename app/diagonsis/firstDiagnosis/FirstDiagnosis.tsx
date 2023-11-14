'use client';
import React, { useEffect, useState } from 'react';
import {Steps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import IntroductionComponentA from './IntroductionComponentA';
import IntroductionComponentB from './IntroductionComponentB';
import Patient from './Patient';
import Sex from './Sex';
import AgeOld from './AgeOld';
import SelectionProcess from './SelectionProcess';
import Symptoms from './Symptoms';
import ClosePage from './ClosePage';

const StepsComponent = ({ current }: { current: number }) => {
	return (
		<div>
			<Steps
				className='w-[10rem]'
				size='default'
				progressDot
				current={current}
				direction='vertical'
				items={[
					{
						title: 'Introduction',
						description: <span className='h-[1rem]'></span>,
					},
					{
						title: 'Patient',
						description: <div className='h-[1rem]'></div>,
					},
					{
						title: 'Symptoms',
						description: <div className='h-[1rem]'></div>,
					},
					{
						title: 'Submit',
						description: <div className='h-[1rem]'></div>,
					},
				]}
			/>
		</div>
	);
};

function FirstDiagnosis() {
	const [stepsNumber, setStepsNumber] = useState(0);
	const [[page, direction], setPage] = useState([0, 0]);

	const variants = {
		enter: (direction: number) => {
			return {
				display: 'none',
			};
		},
		center: {
			zIndex: 1,
			x: 0,
			display: 'block',
			opacity: 1,
		},
		exit: (direction: number) => {
			return {
				zIndex: 0,
				display: 'none',
			};
		},
	};

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	const AnimationComponent = [IntroductionComponentA, IntroductionComponentB, Patient, Sex, AgeOld, SelectionProcess, Symptoms, ClosePage];

	useEffect(() => {
		if (0 <= page && page <= 1) {
			setStepsNumber(0);
		} else if (2 <= page && page < 4) {
			setStepsNumber(1);
		} else if (4 <= page && page < 7) {
			setStepsNumber(2);
		}else{
			setStepsNumber(3);
		}
	}, [page]);

	return (
		<div className='flex justify-center'>
			<StepsComponent current={stepsNumber} />
			<div className='w-[50rem] bg-[#f1f3f4] flex flex-col rounded shadow'>
				<div className='flex-1'>
					<AnimatePresence initial={false} custom={direction}>
						{AnimationComponent.map((Component, index) => (
							<motion.div
								className='w-full h-full'
								key={index}
								custom={direction}
								variants={variants}
								initial='enter'
								animate={page === index ? 'center' : 'exit'}
								exit='exit'
								transition={{
									x: { type: 'spring', stiffness: 100, damping: 30 },
									opacity: { duration: 0.2 },
								}}
								dragElastic={1}
							>
								<Component paginate={paginate} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

export default FirstDiagnosis;
