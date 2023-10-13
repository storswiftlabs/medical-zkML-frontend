'use client';

import React, { useState } from 'react';

function Page({ params }: { params: { posts: string } }) {
	//TODO:to be developed
	const { posts } = params;
	return (
		<div className='p-[20rem] py-[1rem]'>
			{/* <h2 className='font-semibold text-[1.8rem]'>9个低成本的养生方法</h2>
            <Spacer y={4} />
            <div className='flex items-center justify-between'>
                <User
                    name='Jane Doe'
                    description='Product Designer'
                    avatarProps={{
                        src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                    }}
                />
                <span onClick={() => setDz(!dz)}>{dz ? Uncollect : CollectIcon}</span>
            </div>
            <Spacer y={2} />
            <span className='text-[#76839b] text-[0.9rem]'>
                <span className='mr-1'>37</span>
                <span>人赞同了该文章</span>
            </span>
            <Spacer y={4} />
            <div>{tt}</div>
            <Spacer y={2} />
            <span className='text-[#76839b] text-[0.9rem]'>发布于 2023-04-08 13:47</span> */}
		</div>
	);
}

export default Page;
