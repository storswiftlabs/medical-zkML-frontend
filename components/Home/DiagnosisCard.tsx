'use client';
import { Code, Image } from '@nextui-org/react';
import React from 'react';
import { Heart } from '../Icon/AcmeLogo';
import Link from 'next/link';

function DiagnosisCard() {
	return (
		<div>
			<div className='flex justify-center mb-[0.2rem]'>
				<Code color='success'>commonly seen</Code>
			</div>
			<h2 className='text-[2.5rem] text-center p-[2rem] py-0'>Presumptive Diagnosis Operator</h2>
			<div className='text-center px-[20%] my-[0.4rem]'>
				Identify possible conditions and treatment related to your symptoms.Each classification you choose is handled by multiple specialist disease models. The ability to
				predict multiple conditions by training multiple disease-specific models for multiple conditions.
			</div>
			<div className='gap-8 grid grid-cols-2 max-w-full p-[10rem] pt-[0] justify-items-center'>
				{[1, 2, 3, 4, 5, 6].map((i) => (
					// <Card key={i} className='w-full h-[14rem] card hover:scale-105 transition duration-300 flex direction direct'>
					// 	<CardHeader className=''>
					// 		<Heart />
					// 	</CardHeader>
					// 	<CardBody className='pt-[0]'>
					// 		{/* <Tooltip className=' max-w-[30rem]' placement='bottom' content={text}> */}
					// 		<p className='overflow-hidden overflow-ellipsis line-clamp-4'>{12}</p>
					// 		{/* </Tooltip> */}
					// 	</CardBody>
					// </Card>
					<div key={i} className='flex items-center justify-around'>
						<div>
							<Image
								shadow='sm'
								isBlurred
								isZoomed
								width={220}
								height={220}
								alt='NextUI Fruit Image with Zoom'
								src='https://iconfont.alicdn.com/p/illus/preview_image/zrJg50KPJKBZ/344994f1-d080-46ee-b9bf-2f216e960e83.png'
							/>
						</div>
						<div className='max-w-[50%]'>
							<Link href={'#'}>
								<h3 className='text-[1.2rem] font-semibold mb-2 hover:underline'>Lymphography</h3>
							</Link>
							<p className='your-element'>
								Heart disease refers to a variety of conditions that affect the structure and function of the heart.Common heart diseases include coronary artery
								disease, myocardial infarction, heart failure and arrhythmia.
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DiagnosisCard;
