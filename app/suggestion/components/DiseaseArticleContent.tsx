'use client';
import React, { CSSProperties, useState } from 'react';
import { Image, Chip, Spacer, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { CollectIcon, Uncollect } from '@/components/Icon/AcmeLogo';
import { ArticleType } from '@/constant/Api';
import formatData from '@/utils/formatData';
import { postBookmarkAndCancel } from '@/utils/request';
import { useAccount } from 'wagmi';

function DiseaseArticleContent({
	style,
	item,
	DetermineIfCollection,
	articleCollectionInterface,
}: {
	style?: CSSProperties;
	articleCollectionInterface: (address: any) => void;
	item: ArticleType;
	DetermineIfCollection: (str: string) => boolean;
}) {
	const { address } = useAccount();
	const [isCollection, setIsCollection] = useState(false);

	const bookmarkAndCancel = async (url: string) => {
		try {
			setIsCollection(true);
			await postBookmarkAndCancel({ user: address, url });
			articleCollectionInterface(address);
		} catch (error) {
			// handle error
		} finally {
			setTimeout(() => {
				setIsCollection(false);
			}, 1000);
		}
	};

	const formatConversion = (str: string) => {
		if (str.startsWith('https://')) {
			return str;
		} else {
			return `data:image/png;base64,${str}`;
		}
	};

	return (
		<div className='border-y-1' style={{ ...style, paddingTop: '0' }}>
			<div className='my-[3.125rem]'>
				{/* <User
                    id='my-image'
                    name='Jane Doe'
                    avatarProps={{
                        name: item.title.replace(/\s/g, ''),
                        src: formatConversion(item.icon, item.title),
                        className: 'w-8 h-8 text-tiny my-image',
                    }}
                /> */}
				<Image id='my-image' className='my-image' width={30} radius='full' alt='NextUI hero Image' src={formatConversion(item.icon)} />
				<Spacer y={2} />
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='font-semibold text-[1.25rem]'>{item.title}</h2>
						<Link target='_blank' href={item.url} className='containerText w-[30rem] mt-4 underline hover:text-blue-500'>
							{item.url}
						</Link>
					</div>
					{/* <Image isZoomed width={140} height={140} alt='NextUI hero Image' src='https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg' /> */}
				</div>
				<Spacer y={4} />
				<div className='flex items-center gap-4'>
					<div>
						<Chip size='sm'>{item.disease}</Chip>
					</div>
					<div>{formatData.formatDate(item.time, 'yyyy-MM-dd')}</div>
					<span
						onClick={() => {
							!isCollection && bookmarkAndCancel(item.url);
						}}
					>
						{isCollection ? <Spinner size='sm' color='default' /> : DetermineIfCollection(item.url) ? Uncollect : CollectIcon}
					</span>
				</div>
			</div>
		</div>
	);
}

export default DiseaseArticleContent;
