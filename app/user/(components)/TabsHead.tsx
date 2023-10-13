'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Chip } from '@nextui-org/react';
import Consultation from './Consultation';
import Work from './Work';
import Collect from './Collect';
import { DiagnosticIcon, GalleryIcon, WritingsIcon } from '@/components/Icon/AcmeLogo';

export default function TabsHead() {
    const [diagnosticHistory, setDiagnosticHistory] = useState(0);
    function handleDataReceived(length: any) {
        setDiagnosticHistory(length);
    }

    return (
        <div className='flex w-full flex-col'>
            <Tabs
                color='primary'
                variant='underlined'
                classNames={{
                    tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                    cursor: 'w-full bg-[#7828c8]',
                    tab: 'max-w-fit px-0 h-12',
                    tabContent: 'group-data-[selected=true]:text-[#7828c8]',
                }}>
                <Tab
                    key='videos'
                    title={
                        <div className='flex items-center space-x-2'>
                            <DiagnosticIcon />
                            <span>Consultation record </span>
                            <Chip size='sm' variant='faded'>
                                {diagnosticHistory}
                            </Chip>
                        </div>
                    }>
                    <Consultation onDataReceived={handleDataReceived} />
                </Tab>
                <Tab
                    className='pt-0'
                    key='music'
                    title={
                        <div className='flex items-center space-x-2'>
                            <WritingsIcon />
                            <span>Collect</span>
                            <Chip size='sm' variant='faded'>
                                3
                            </Chip>
                        </div>
                    }>
                    <Collect />
                </Tab>
                <Tab
                    key='photos'
                    title={
                        <div className='flex items-center space-x-2'>
                            <GalleryIcon />
                            <span>Published work</span>
                            <Chip size='sm' variant='faded'>
                                0
                            </Chip>
                        </div>
                    }>
                    <Work />
                </Tab>
            </Tabs>
        </div>
    );
}
