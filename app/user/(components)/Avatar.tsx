'use client';
import { User } from '@nextui-org/react';
import React from 'react';
import { useAccount } from 'wagmi';

function Avatar() {
    const { address } = useAccount();
    return (
        <div className='mb-[1rem]'>
            <User
                name={address}
                description='Medical'
                avatarProps={{
                    className: 'rounded-[10%]',
                    size: 'lg',
                    src: '/dy.svg',
                }}
            />
        </div>
    );
}

export default Avatar;
