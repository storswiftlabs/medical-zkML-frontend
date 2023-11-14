import DiagnosticFramework from '@/components/DiagnosticFramework';
import { WarnIcon } from '@/components/Icon/AcmeLogo';
import { Button, RadioGroup } from '@nextui-org/react';
import { Divider, Form, Button as ButtonAnd, Input, Radio } from 'antd';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PreviewWindow from './components/PreviewWindow';

function SelectionProcess({ paginate }: { paginate: (newDirection: number) => void }) {
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);
	const fileRef = useRef<HTMLInputElement>(null);
	const SelectList = [
		{
			name: 'I have diabetes',
		},
		{
			name: 'I’m overweight or obese',
		},
		{
			name: 'I have hypertension',
		},
		{
			name: 'I have smoked cigarettes for at least 10 years',
		},
		{
			name: 'I’ve recently suffered an injury',
		},
		{
			name: 'I have high cholesterol',
		},
	];
	const onSubmit = () => {
		fileRef.current?.click();
	};

	const onBack = () => {
		paginate(-1);
	};

	const onFinish = (values: any) => {
		// console.log('Success:', values);
		if (values) {
			paginate(1);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		// console.log('Failed:', errorInfo);
	};

	const showDrawer = (index: number) => {
		setOpen(true);
		var val = '';
		switch (index) {
			case 0:
				val = 'Please answer YES if a doctor has ever said he|she has diabetes.';
				break;
			case 1:
				val = `Overweight or obesity may be determined by calculating the body mass index (BMI). The BMI is calculated by dividing the person's weight in kilograms by the height in meters and dividing the result again by the height in meters. BMI above 25 in an adult indicates overweight, and above 30 indicates obesity. In teenagers, BMI is assessed with growth charts – 85th-95th percentile is overweight, above 95th is obese. Current BMI can also be assessed with online BMI calculators.`;
				break;
			case 2:
				val = `Diagnosed hypertension refers to the condition where a medical professional has confirmed high blood pressure in a patient. This definition excludes isolated instances of self-measured high blood pressure without a prior official diagnosis or treatment of hypertension.`;
				break;
			case 3:
				val = `Confirm this option if you currently smoke cigarettes or if you have smoked cigarettes for at least 10 years in the past.`;
				break;
			case 4:
				val = `The injury occurred within the last hours to days, e.g., as a result of exercise or an accident.`;
				break;
			case 5:
				val = `Elevated cholesterol values in a healthy person are considered to be: total cholesterol above 190 mg/dl (5.0 mmol/l) or LDL fraction above 115 mg/dl (3.0 mmol/l). However, cholesterol levels may be considered elevated even at lower values in people with chronic diseases, e.g., diabetes, kidney disease, hypertension, or smoking cigarettes.`;
				break;
			default:
				break;
		}
		setText(val);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<DiagnosticFramework
			headText='Please check all the statements below that apply to you '
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
			<div>
				<p>Select one answer in each row</p>
				<Divider className='mb-1' />
				<Form name='basic' className='process-form px-4' onFinish={onFinish} onFinishFailed={onFinishFailed}>
					{SelectList.map((item, index) => (
						<>
							<Form.Item
								key={index}
								label={<div className='text-[1.2rem]'>{item.name}</div>}
								name={item.name}
								rules={[{ required: true, message: 'Please select one answer' }]}
							>
								<Radio.Group size='large'>
									<Radio value={1}>Yes</Radio>
									<Radio value={2}>No</Radio>
									<Radio value={3}>Don’t know</Radio>
								</Radio.Group>
							</Form.Item>
							<div onClick={() => showDrawer(index)} className='px-1 text-[#1470c8] pb-2 flex items-center gap-1'>
								<WarnIcon fill={'#1470c8'} />
								<span>What does it mean?</span>
							</div>
							<Divider className='mt-1 mb-1' />
						</>
					))}

					<ButtonAnd className='opacity-0' ref={fileRef} htmlType='submit'>
						Submit
					</ButtonAnd>
				</Form>
				<PreviewWindow headChildren={<div className='text-[1.8rem]'>Explanation</div>} contentChildren={<p>{text}</p>} onClose={onClose} isOpen={open} />
			</div>
		</DiagnosticFramework>
	);
}

export default SelectionProcess;
