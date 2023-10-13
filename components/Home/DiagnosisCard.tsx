'use client';
import { Card, CardBody, CardHeader, Tooltip } from '@nextui-org/react';
import React from 'react';
import { Heart } from '../Icon/AcmeLogo';

function DiagnosisCard() {
	//TODO:to be developed
	const text =
		'Cardiology is also called cardiovascular medicine. The diseases that can be seen are mainly for cardiovascular diseases, such as coronary atherosclerotic heart disease, hypertension, arrhythmia, and some cardiomyopathies, such as hypertrophic cardiomyopathy, restrictive cardiomyopathy, dilated cardiomyopathy, alcoholic cardiomyopathy, and peripartum cardiomyopathy.';

	return (
		<div>
			<h2 className='text-[2.5rem] text-center p-[2rem]'>Presumptive Diagnosis Operator</h2>
			<div className='gap-8 grid grid-cols-4 sm:grid-cols-4 max-w-full p-[4rem] pt-[0]'>
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Card key={i} className='w-full h-[14rem] card hover:scale-105 transition duration-300 flex direction direct'>
						<CardHeader className=''>
							<Heart />
						</CardHeader>
						<CardBody className='pt-[0]'>
							{/* <Tooltip className=' max-w-[30rem]' placement='bottom' content={text}> */}
							<p className='overflow-hidden overflow-ellipsis line-clamp-4'>{text}</p>
							{/* </Tooltip> */}
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}

export default DiagnosisCard;
