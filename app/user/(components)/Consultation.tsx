'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Pagination,
	Selection,
	ChipProps,
	Modal,
	useDisclosure,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/react';
import { columns } from './(table)/data';
import '@/components/index.css';
import { CountdownProps } from 'antd/es/statistic/Countdown';
import { fetchList, getDiseaseInfo, postDiagnosticDeletion, postOutcomes, postRecommend } from '@/utils/request';
import { OutcomesType_Data } from '@/constant/Api';
import RenderCell from './RenderCell';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { PlusIcon, SearchIcon } from '@/components/Icon/AcmeLogo';
import formatData from '@/utils/formatData';
import { useRouter } from 'next/navigation';

const statusColorMap: Record<string, ChipProps['color']> = {
	active: 'success',
	paused: 'danger',
	vacation: 'warning',
};

export default function Consultation({ onDataReceived }: { onDataReceived: (length: any) => void }) {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { address } = useAccount();
	const [pagination, setPagination] = useState({
		data: [] as OutcomesType_Data[],
		count: 0,
		pageNum: 1,
		pageSize: 10,
		total: 0,
	});
	const [isModal, setIsModal] = useState(true);
	const [allData, setAllData] = useState<OutcomesType_Data[]>([]);
	const [predictingOutcomes, setPredictingOutcomes] = useState({ result: '', suggestion: [] as string[], nameList: [] as string[], name: '' });
	const [isDel, setIsDel] = useState(false);
	const [filterValue, setFilterValue] = useState('');
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	const [upData, setUpdata] = useState({} as any);

	const fetchData = useCallback(async () => {
		try {
			const { data, count } = await postOutcomes({ user: address });
			if (data) {
				setPagination((s) => ({ ...s, count }));
				setAllData(data);
				onDataReceived(data.length);
			}
		} catch (error) {
			// process error
		}
	}, [address, onDataReceived]);

	const ValidationFunction = async (res: any): Promise<boolean> => {
		const provider = new ethers.providers.JsonRpcProvider('https://calibration.filfox.info/rpc/v1');
		const contract = new ethers.Contract(res?.data?.contract_address, res.data.abi, provider);
		const data = await contract.verify(res.data.proof, [res.data.result]);
		return data;
	};

	useEffect(() => {
		fetchData();
	}, []);

	// paging function
	const paginateData = (data: string | any[], pageNum: number, pageSize: number) => {
		const startIndex = (pageNum - 1) * pageSize;
		const endIndex = pageNum * pageSize;
		return data.slice(startIndex, endIndex);
	};

	// Updating paging data
	const updatePaginationData = useCallback((data: string | any[], pageNum: number, pageSize: number) => {
		return {
			total: Math.ceil(data.length / pageSize),
			data: paginateData(data, pageNum, pageSize),
		};
	}, []);

	// Update Paging Status
	const updatePaginationState = (prevPagination: any, newData: { total: number; data: string | any[] }, pageNum: number) => ({
		...prevPagination,
		...newData,
		pageNum,
	});

	const onPaginationChange = useCallback(
		(page: number) => {
			const newData = updatePaginationData(allData, page, pagination.pageSize);
			setPagination((prevPagination) => updatePaginationState(prevPagination, newData, page));
		},
		[allData, pagination.pageSize, updatePaginationData]
	);

	function splitStringWithRegex(str: string) {
		const regex = /\d+\.[\s\S]+?(?=\d+\.)|\d+\.[\s\S]+$/g;
		const result = str.match(regex);
		return result;
	}

	useEffect(() => {
		const newData = updatePaginationData(allData, pagination.pageNum, pagination.pageSize);
		setPagination((prevPagination) => updatePaginationState(prevPagination, newData, pagination.pageNum));
	}, [allData, pagination.pageSize, pagination.pageNum, updatePaginationData]);

	const handleOpen = async (result: string, name: string) => {
		try {
			const illnessesNameList = await getDiseaseInfo({ Disease: name });
			const nameList = illnessesNameList.data.Output.Result.map((item) => item.Value);
			const suggestion = await postRecommend({ disease: name });
			if (suggestion?.data) {
				const processedArray = `https://ipfs.io/ipfs/${suggestion.data}`;
				const fetchPromises = await fetchList(processedArray);
				try {
					const strArr = splitStringWithRegex(fetchPromises);
					setPredictingOutcomes({ result, suggestion: strArr || [''], nameList, name });
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsModal(true);
			onOpen();
		}
	};

	const handleOpenDetail = (user: OutcomesType_Data) => {
		const regex = /(\w+)\s*:\s*(\d+(\.\d+)?)/g;
		const matches = user.Inputs.matchAll(regex);
		const arr = Array.from(matches, (match) => ({ name: match[1], value: Number(match[2]) }));
		setUpdata({ ...user, Inputs: arr });
		setIsModal(false);
		onOpen();
	};
	const onFinish: CountdownProps['onFinish'] = () => {
		// chronograph trigger
		location.reload();
		console.log('finished!');
	};

	useEffect(() => {
		setIsDel(selectedKeys instanceof Set ? selectedKeys.size !== 0 : selectedKeys === 'all');
	}, [selectedKeys]);

	const updatePagination = useMemo(
		() => (value: string) => {
			if (value) {
				const filteredData = allData.filter((item) => item.Disease.toLowerCase().includes(value.toLowerCase()));
				setPagination((s) => ({ ...s, data: filteredData }));
			} else {
				setPagination((s) => ({ ...s, data: allData }));
			}
		},
		[allData]
	);

	const onSearchChange = useCallback(
		(value?: string) => {
			setFilterValue(value || '');
			updatePagination(value || '');
		},
		[updatePagination]
	);

	const onDeleteMultipleChoice = useCallback(async () => {
		const keysList =
			selectedKeys === 'all'
				? pagination.data.map((item) => {
						return item.ID;
				  })
				: Array.from(selectedKeys, (key: any) => parseInt(key));

		try {
			await postDiagnosticDeletion({ user: address, ids: keysList });
			fetchData();
			location.reload();
		} catch (err) {
			console.log(err);
		}
	}, [selectedKeys, address, fetchData, pagination.data]);

	const onDelete = useCallback(
		async (ids: number) => {
			try {
				await postDiagnosticDeletion({ user: address, ids: [ids] });
				fetchData();
			} catch (err) {
				console.log(err);
			}
		},
		[address, fetchData]
	);

	useEffect(() => {
		if (!address) return router.push('/');
	}, [address, router]);

	const viewModal = useCallback(() => {
		const modalHeader = isModal ? `Diagnosis : ${predictingOutcomes.name}` : 'Records uploaded';
		const modalBody = isModal ? (
			<div>
				<div className='mb-1'>
					<span className=' font-[600]'>The diagnosis is</span> : <div>{predictingOutcomes.result}</div>
				</div>
				<div>
					<span className=' font-[600]'>Results of current disease diagnostic appearances :</span>
				</div>

				<ul className='list-disc px-[2rem]'>
					{predictingOutcomes.nameList.map((item, i) => {
						return (
							<li className='my-[0.4rem]' key={i}>
								{item}
							</li>
						);
					})}
				</ul>
				<div>
					<span className=' font-[600]'>The following are your disease recommendations :</span>
				</div>
				<ul className='list-disc px-[2rem]'>
					{predictingOutcomes.suggestion.map((i) => (
						<li className='my-[0.4rem]' key={i}>
							{i}
						</li>
					))}
				</ul>
			</div>
		) : (
			<>
				<ul className='list-disc px-[2rem]'>
					{upData.Inputs.map((i: any) => (
						<li className='my-[0.4rem]' key={i}>
							{i.name} : {i.value}
						</li>
					))}
				</ul>
				<div>The current record was created in : {formatData.formatDate(upData.EndTime, 'yyyy-MM-dd HH:mm:ss')}</div>
			</>
		);
		return (
			<Modal hideCloseButton size={'2xl'} isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{modalHeader}</ModalHeader>
							<ModalBody>{modalBody}</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Close
								</Button>
								<Button color='primary' onPress={onClose}>
									OK
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		);
	}, [isOpen, onClose, predictingOutcomes, isModal, upData.EndTime, upData.Inputs]);

	const topContent = useMemo(() => {
		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						classNames={{
							base: 'w-full sm:max-w-[44%]',
							inputWrapper: 'border-1',
						}}
						placeholder='Search by name...'
						size='sm'
						startContent={<SearchIcon className='text-default-300' />}
						value={filterValue}
						variant='bordered'
						onClear={() => setFilterValue('')}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<Button
							onClick={onDeleteMultipleChoice}
							isDisabled={!isDel}
							className='bg-foreground text-background'
							endContent={<PlusIcon width={undefined} height={undefined} />}
							size='sm'
						>
							Delete Check
						</Button>
					</div>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, isDel, onDeleteMultipleChoice]);

	const hasSearchFilter = Boolean(filterValue);

	const bottomContent = useMemo(() => {
		return (
			pagination.total > 1 && (
				<div className='py-2 px-2 flex justify-between items-center'>
					<Pagination
						showControls
						isDisabled={hasSearchFilter}
						classNames={{
							cursor: 'bg-foreground text-background',
						}}
						color='default'
						page={pagination.pageNum}
						total={pagination.total}
						variant='light'
						onChange={onPaginationChange}
					/>
				</div>
			)
		);
	}, [pagination, hasSearchFilter, onPaginationChange]);

	const classNames = useMemo(
		() => ({
			wrapper: ['max-h-[382px]', 'max-w-3xl'],
			th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
			td: [
				// changing the rows border radius
				// first
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// middle
				'group-data-[middle=true]:before:rounded-none',
				// last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none',
			],
		}),
		[]
	);

	return (
		<>
			<Table
				isCompact
				removeWrapper
				bottomContent={bottomContent}
				bottomContentPlacement='outside'
				checkboxesProps={{
					classNames: {
						wrapper: 'after:bg-foreground after:text-background text-background',
					},
				}}
				classNames={classNames}
				selectedKeys={selectedKeys}
				selectionMode='multiple'
				// sortDescriptor={sortDescriptor}
				topContent={topContent}
				topContentPlacement='outside'
				onSelectionChange={setSelectedKeys}
				// onSortChange={setSortDescriptor}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align={'center'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={'No users found'} items={pagination.data}>
					{(item) => (
						<TableRow key={item.ID}>
							{(columnKey) => (
								<TableCell align='center'>
									<RenderCell
										handleOpenDetail={handleOpenDetail}
										onDelete={onDelete}
										ValidationFunction={ValidationFunction}
										onFinish={onFinish}
										user={item}
										columnKey={columnKey}
										handleOpen={handleOpen}
									/>
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			{viewModal()}
		</>
	);
}
