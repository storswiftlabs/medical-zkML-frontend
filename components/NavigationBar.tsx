'use client';
import React, { useEffect, useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Avatar, Button, Tooltip } from '@nextui-org/react';
import { AcmeLogo } from './Icon/AcmeLogo';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link.js';
import './index.css';
import { postUser } from '@/utils/request';

export default function NavigationBar() {
	const [isClient, setIsClient] = useState(false);
	const pathname = usePathname();
	const { isConnected, address } = useAccount({
		async onConnect({ address, connector, isReconnected }) {
			if (connector) {
			}
		},
	});

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		address && connectedUser(address);
	}, [isConnected, address]);

	const connectedUser = async (address: `0x${string}`) => {
		const res = await postUser({ address });
	};

	const name = {
		item: [
			'flex',
			'relative',
			'h-full',
			'items-center',
			"data-[active=true]:after:content-['']",
			'data-[active=true]:after:absolute',
			'data-[active=true]:after:bottom-0',
			'data-[active=true]:after:left-0',
			'data-[active=true]:after:right-0',
			'data-[active=true]:after:h-[2px]',
			'data-[active=true]:after:rounded-[2px]',
			'data-[active=true]:after:bg-[#7828c8]',
		],
	};

	const navbarItem = [
		{
			name: 'Home',
			link: '/',
		},
		{
			name: 'Diagonsis',
			link: '/diagonsis',
		},
		{
			name: 'Suggestion',
			link: '/suggestion',
		},
		//TODO:to be developed
		// {
		//     name: 'About',
		//     link: '/about',
		// },
	];

	return (
		<Navbar position='static' maxWidth='full' classNames={name}>
			<div className=' flex items-center mr-[2rem]'>
				<AcmeLogo />
				<p className='font-bold text-inherit'>Medical</p>
			</div>

			<NavbarContent className='hidden sm:flex gap-12' justify='center'>
				{navbarItem.map((item) => (
					<NavbarItem key={item.name + ''} isActive={pathname === item.link}>
						<Link color={pathname === item.link ? `secondary` : 'foreground'} className='font-extrabold' href={item.link}>
							{item.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			{isClient ? (
				<>
					<NavbarContent as='div' justify='end'>
						{isConnected && (
							<>
								<Tooltip
									showArrow
									placement='left'
									content='Click to go to Personal Centre'
									classNames={{
										base: 'py-2 px-4 shadow-xl text-black bg-gradient-to-br from-white to-neutral-400',
										arrow: 'bg-neutral-400 dark:bg-white',
									}}
								>
									<Link href='/user' className='linkButton'>
										<Avatar
											isBordered
											isFocusable
											//@ts-ignore
											color='#f31260'
											as='button'
											className='transition-transform '
											name='Jason Hughes'
											size='sm'
											src='/dy.svg'
										/>
									</Link>
								</Tooltip>
							</>
						)}
					</NavbarContent>
					<ConnectButton.Custom>
						{({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
							// Note: If your app doesn't use authentication, you
							// can remove all 'authenticationStatus' checks
							const ready = mounted && authenticationStatus !== 'loading';
							const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

							return (
								<div
									{...(!ready && {
										'aria-hidden': true,
										style: {
											opacity: 0,
											pointerEvents: 'none',
											userSelect: 'none',
										},
									})}
								>
									{(() => {
										if (!connected) {
											return (
												<Button onClick={openConnectModal} type='button'>
													Connect Wallet
												</Button>
											);
										}

										if (chain.unsupported) {
											return (
												<button onClick={openChainModal} type='button'>
													Wrong network
												</button>
											);
										}

										return (
											<div style={{ display: 'flex' }}>
												<button onClick={openChainModal} style={{ display: 'flex', alignItems: 'center' }} type='button'></button>
												<button onClick={openAccountModal} type='button'>
													{account.displayName}
													{account.displayBalance ? ` (${account.displayBalance})` : ''}
												</button>
											</div>
										);
									})()}
								</div>
							);
						}}
					</ConnectButton.Custom>
				</>
			) : (
				<></>
			)}
		</Navbar>
	);
}
