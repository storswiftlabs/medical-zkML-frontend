'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Input,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Data, OperatorList } from '@/constant/Api';
import ModalElementT from './ModalElementT';
import { postPrediction } from '@/utils/request';
import Link from 'next/link';
import { useAccount } from 'wagmi';

function EnterModal({
	isOpen,
	onOpen,
	onClose,
	handleOpen,
	enterObject,
	operatorList,
}: {
	isOpen: boolean;
	onOpen?: () => void;
	onClose: () => void;
	handleOpen?: () => void;
	enterObject: Data;
	operatorList: OperatorList[];
}) {
	const fileRef = useRef<HTMLInputElement>(null);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		getValues,
	} = useForm();
	const [selectedKeys, setSelectedKeys] = useState<any>(new Set(['Choose the engine you need']));
	const { address } = useAccount();
	const [value, setValue1] = useState(0);
	const selectedValue = useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys]);
	const [[page, direction], setPage] = useState([0, 0]);

	const onSubmit = useCallback(
		async (data: any) => {
			if (Array.from(selectedKeys)[0] === 'Choose the engine you need') {
				return;
			}

			if (page < 1) {
				return;
			}

			let result = {
				user: address,
				name: enterObject.Name,
				module: Array.from(selectedKeys)[0],
				inputs: [] as any[],
			};

			for (let key in data) {
				let matchedInput = enterObject.Inputs.find((item) => item.Name === key);
				if (matchedInput) {
					result.inputs.push({
						name: matchedInput.Name,
						index: matchedInput.Index,
						'select-key': matchedInput.InputMethod === 'input' ? String(data[key]) : matchedInput.Select.find((i) => Number(i.Value) == Number(data[key]))?.Key, //
						'select-value': String(data[key]),
					});
				}
			}
			try {
				const ForecastData = await postPrediction(result);
			} catch (error) {
				console.error('Error:', error);
			}
		},
		[enterObject, selectedKeys, address, page]
	);

	const judgingFunction = (setArr: any) => {
		const setArray = Array.from(setArr);
		return setArray[0] === 'Choose the engine you need';
	};

	const variants = {
		enter: (direction: number) => {
			return {
				x: direction > 0 ? 1000 : -1000,
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
				x: direction < 0 ? 1000 : -1000,
				display: 'none',
			};
		},
	};

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	const headerText = (page: number) => {
		switch (page) {
			case 0:
				return 'Enter or select the symptoms';
			case 1:
				return 'Choose a diagnostic engine';
			case 2:
				return 'Please be patient';
			default:
				break;
		}
	};

	const submitEvent = () => {
		fileRef.current?.click();
		if (isValid) {
			paginate(1);
		}
	};

	const InputDiv = ({ errors, register, name, select, index, item }: any) => {
		return (
			<div className='flex items-center justify-between' key={index}>
				<span className=' text-[#773247] mr-[0.4rem]'>{name}</span>
				<Input
					id='inp'
					className='w-[18rem]'
					variant='bordered'
					// errorMessage={Object.keys(errors).includes(name) ? item.Warn : ''}
					isInvalid={Object.keys(errors).includes(name) ? 'invalid' : ''}
					color={Object.keys(errors).includes(name) ? 'danger' : 'default'}
					placeholder={'Please enter ' + select[0].Key}
					// {...register(name, { required: true, pattern: new RegExp(item.Regular) })}
					{...register(name, { required: true })}
				/>
			</div>
		);
	};

	useEffect(() => {
		if (page === 0) {
			document.querySelectorAll('input[id="inp"]').forEach((input: any) => {
				input.value = '';
			});
		}
	}, [page]);

	const SelectDiv = (name: string, items: any[], register: any, setValue: any, index: number, errors: any) => {
		return (
			<div className='flex items-center justify-between' key={index}>
				<span className=' text-[#773247] mr-[0.4rem]'>{name}</span>
				<Select
					ref={...register(name, { value: items[0].Value }, { required: true })}
					disallowEmptySelection
					defaultSelectedKeys={[String(items[0].Value)]}
					{...register(name, { value: items[0].Value }, { required: true })}
					className='w-[18rem] h-[2rem] flex text-center asb'
					variant='bordered'
				>
					{items.map((animal) => (
						<SelectItem className='h-[2rem] pt-0' key={animal.Value} value={animal.Key}>
							{animal.Key}
						</SelectItem>
					))}
				</Select>
			</div>
		);
	};

	const ModalElementA = useCallback(() => {
		return (
			<div className='justify-between min-h-[16rem] w-full '>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4 mb-[1rem]'>
						{enterObject?.Inputs?.map((item, index) => {
							if (item.InputMethod === 'input') {
								//The delegate is input
								return InputDiv({ register, errors, name: item.Name, select: item.Select, index, item });
							} else {
								// Representatives are drop-down boxes
								return SelectDiv(item.Name, item.Select, register, setValue, index, errors);
							}
						})}
					</div>
					{/* @ts-ignore */}
					<Button ref={fileRef} className='opacity-0' type='submit'>
						Submit
					</Button>
				</form>
			</div>
		);
	}, [enterObject, onSubmit, register, setValue, errors, handleSubmit]);

	const ModalElementB = useCallback(() => {
		const modal = [...selectedKeys];
		return (
			<div className='min-h-[16rem] flex justify-center items-center flex-col'>
				<Dropdown>
					<DropdownTrigger>
						<Button variant='bordered' className='capitalize min-w-[10rem]'>
							<div className=' mr-[1rem]'>{selectedValue}</div>
							<svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='19590' width='20' height='20'>
								<path
									d='M787.2 380.8c-9.6-9.6-22.4-12.8-35.2-12.8l-480 3.2c-12.8 0-25.6 3.2-35.2 12.8-19.2 19.2-19.2 48 0 67.2l240 240c0 0 0 0 0 0 0 0 0 0 0 0 3.2 3.2 9.6 6.4 12.8 9.6 0 0 3.2 3.2 3.2 3.2 16 6.4 38.4 3.2 51.2-9.6l240-243.2C806.4 428.8 803.2 400 787.2 380.8z'
									p-id='19591'
								></path>
							</svg>
						</Button>
					</DropdownTrigger>
					<DropdownMenu variant='flat' disallowEmptySelection selectionMode='single' selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
						{operatorList.map((item, index) => (
							<DropdownItem key={item.name}>{item.name}</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
				{/* //TODO Description of the engine to be added */}
				<div className=' w-[60%] text-center'>
					{modal[0] == 'Choose the engine you need' ? 'Models vary in accuracy and focus' : operatorList.find((item) => item.name === modal[0])?.description}
				</div>
			</div>
		);
	}, [selectedValue, selectedKeys, operatorList]);

	const AnimationComponent = [ModalElementA, ModalElementB];
	return (
		<>
			<Modal
				className='z-50'
				hideCloseButton
				scrollBehavior='inside'
				size={'5xl'}
				isOpen={isOpen}
				onClose={() => {
					onClose();
					reset(); // Empty Data react hooks form
					setPage([0, 0]); // Returns the first component
					setSelectedKeys(new Set(['Choose the engine you need']));
				}}
			>
				<ModalContent>
					{(onClose: any) => (
						<>
							<ModalHeader className='flex gap-1'>{headerText(page)}</ModalHeader>
							<ModalBody className='flex flex-row  max-w-full'>
								<AnimatePresence initial={false} custom={direction}>
									{page === 2 ? (
										<motion.div
											className='w-full min-h-[16rem]'
											custom={direction}
											variants={variants}
											initial='enter'
											animate={page === 2 ? 'center' : 'exit'}
											exit='exit'
											transition={{
												x: { type: 'spring', stiffness: 100, damping: 30 },
												opacity: { duration: 0.2 },
											}}
											dragElastic={1}
										>
											<ModalElementT current={3} value={value} />
											{/* <Loaders /> */}
										</motion.div>
									) : (
										AnimationComponent.map((Component, index) => (
											<motion.div
												className='w-full'
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
												<Component />
											</motion.div>
										))
									)}
								</AnimatePresence>
							</ModalBody>
							<ModalFooter>
								{page === 0 ? (
									<Button color='danger' variant='light' onPress={onClose}>
										Close
									</Button>
								) : page === 2 ? (
									<></>
								) : (
									<Button color='primary' onClick={() => paginate(-1)}>
										Back
									</Button>
								)}

								{page === 1 ? (
									<Button
										isDisabled={judgingFunction(selectedKeys)}
										color='primary'
										onPress={() => {
											paginate(1);
											submitEvent();
										}}
									>
										Submit
									</Button>
								) : page === 2 ? (
									<Link href='/user'>
										<Button color='primary'>Go</Button>
									</Link>
								) : (
									<Button
										color='primary'
										onClick={() => {
											fileRef.current?.click();
											isValid && paginate(1);
										}}
									>
										Next
									</Button>
								)}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default EnterModal;
