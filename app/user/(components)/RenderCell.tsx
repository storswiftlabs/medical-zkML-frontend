'use client';
import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip, User } from '@nextui-org/react';
import Countdown from 'antd/es/statistic/Countdown';
import { useAccount } from 'wagmi';
import React, { useState } from 'react';
import { postForecastResult } from '@/utils/request';
import { OutcomesType_Data } from '@/constant/Api';
import { Correct, Mistake, VerticalDotsIcon } from '@/components/Icon/AcmeLogo';
import formatData from '@/utils/formatData';
import { useRouter } from 'next/navigation';

const statusColorMap: Record<string, ChipProps['color']> = {
	active: 'success',
	paused: 'danger',
	vacation: 'warning',
};

const RenderCell = ({
	user,
	columnKey,
	handleOpen,
	onFinish,
	ValidationFunction,
	onDelete,
	handleOpenDetail,
}: {
	handleOpenDetail: (user: OutcomesType_Data) => void;
	onDelete: (ids: number) => void;
	ValidationFunction: (res: any) => Promise<boolean>;
	onFinish: any;
	user: OutcomesType_Data;
	columnKey: React.Key;
	handleOpen: (result: string, name: string) => void;
}) => {
	const [verifySend, setVerifySend] = useState(true);
	const router = useRouter();
	const { address } = useAccount();
	const [isValidation, setIsValidation] = useState(false);
	const [valiId, setValiId] = useState(0);
	const [verifyWhether, setVerifyWhether] = useState(false);
	const loadingFunction = async (isVer: boolean, id: number, name: string) => {
		setValiId(id);
		if (isVer) {
			if (verifySend) {
				setVerifySend(false);
				try {
					// Verify
					const res = await postForecastResult({ user: address, id });
					const result = await ValidationFunction(res);
					console.log(result, 'result');
					setIsValidation(true);
					setVerifyWhether(result === true ? true : false);
				} catch (error) {
					console.log(error);
				} finally {
					setVerifySend(true);
				}
			}
		} else {
			// re-upload
			router.push(`/diagonsis?name=${name}`);
		}
	};
	const stateFunction = (state: string) => {
		switch (state) {
			case 'paused':
				return 'Failed';
			case 'active':
				return 'Success';
			case 'vacation':
				return 'Pending';
			default:
				break;
		}
	};

	const outputFunction = (out: string) => {
		if (out !== '1' && out !== '-1') {
			return out;
		}
		return '';
	};

	const switchFun = (Output: string, EndTime: number, Message: string) => {
		const timeInSeconds = Math.floor(Date.now() / 1000); // Get the timestamp of the current time in seconds

		if (timeInSeconds < EndTime && Output == '-1') {
			return true;
		} else {
			return false;
		}
	};

	switch (columnKey) {
		case 'Module':
			return <>{user.Module}</>;
		case 'Output':
			return <>{outputFunction(user.Output)}</>;
		case 'id':
			return <div>{user.ID}</div>;
		case 'name':
			return (
				<User
					avatarProps={{ radius: 'full', size: 'sm', src: '' }}
					classNames={{
						description: 'text-default-500',
					}}
					name={user.Disease}
				></User>
			);
		case 'status':
			let isstatus;
			const currentTimeInSeconds = Math.floor(Date.now() / 1000);
			if (currentTimeInSeconds > user.EndTime) {
				if (Number(user.Output) === -1) {
					isstatus = 'paused';
				} else {
					isstatus = 'active';
				}
			} else {
				if (user.Output == '-1' && user.Message.length == 0) {
					isstatus = 'vacation';
				} else if (user.Output != '-1' && user.Message.length == 0) {
					isstatus = 'active';
				} else {
					isstatus = 'paused';
				}
			}
			return (
				<Chip className='capitalize border-none gap-1 text-default-600' color={statusColorMap[isstatus]} size='sm' variant='dot'>
					{stateFunction(isstatus)}
				</Chip>
			);
		case 'actions':
			return (
				<div className='relative flex justify-end items-center gap-2'>
					<Dropdown className='bg-background border-1 border-default-200'>
						<DropdownTrigger>
							<Button isIconOnly radius='full' size='sm' variant='light'>
								<VerticalDotsIcon className='text-default-400' width={undefined} height={undefined} />
							</Button>
						</DropdownTrigger>
						<DropdownMenu disabledKeys={Number(user.Output) !== -1 ? [] : ['view']}>
							<DropdownItem key='view' onPress={() => handleOpen(user.Output, user.Disease)}>
								Views
							</DropdownItem>
							<DropdownItem
								key='detail'
								onPress={() => handleOpenDetail(user)} //TODO:Predicted results returned
							>
								Details
							</DropdownItem>
							<DropdownItem onClick={() => onDelete(user.ID)} key='delete' color='danger'>
								Delete
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			);
		case 'validation':
			const isVer = Number(user.Output) !== -1 && !isValidation;
			return (
				<>
					{switchFun(user.Output, user.EndTime, user.Message) ? (
						<Countdown value={user.EndTime * 1000} onFinish={onFinish} />
					) : !isValidation ? (
						<div>
							<Button
								onClick={() => loadingFunction(isVer, user.ID, user.Disease)}
								size='sm'
								spinner={
									<svg className='animate-spin h-5 w-5 text-current' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
										<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
										<path
											className='opacity-75'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											fill='currentColor'
										/>
									</svg>
								}
								color={isVer ? 'primary' : 'danger'}
							>
								{isVer ? 'Verify' : 'Reupload'}
							</Button>
						</div>
					) : (
						user.ID === valiId && <div className='ml-[1.5rem]'>{verifyWhether ? <Correct /> : <Mistake />}</div>
					)}
				</>
			);
		case 'StartTime':
			return <>{formatData.formatDate(user.StartTime, 'yyyy-MM-dd HH:mm')}</>;
		default:
			return 1;
	}
};
export default RenderCell;
