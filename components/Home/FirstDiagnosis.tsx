import React from 'react';
import '../index.css';

const LinkButton = () => {
	return (
		<button className='cat'>
			<p>Go to experience</p>
			<svg stroke-width='4' stroke='currentColor' viewBox='0 0 24 24' fill='none' className='h-6 w-6' xmlns='http://www.w3.org/2000/svg'>
				<path d='M14 5l7 7m0 0l-7 7m7-7H3' stroke-linejoin='round' stroke-linecap='round'></path>
			</svg>
		</button>
	);
};

function FirstDiagnosis() {
	return (
		<div className='p-4 my-[1rem]'>
			<div className='w-full h-[14rem] bg-[#f6f5f8] rounded-[1rem] pt-[3rem] pl-[8rem] flex'>
				<h2 className='home-diagnosis-h2 font-extrabold text-[2.5rem] flex-1'>First Diagnosis</h2>
				<div className='w-[70%] pr-[8rem] pt-2'>
					<span className='home-diagnosis-text text-[1.2rem]'>
						Check your symptoms for a brief (3 minute) symptom assessment. The information you provide is secure and will not be shared. Your results will include:
						possible causes of your symptoms. Advice on what to do next.
					</span>
					<div className='mt-8'>
						<LinkButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default FirstDiagnosis;
