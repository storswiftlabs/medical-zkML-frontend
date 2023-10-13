'use client';
import React from 'react';
import './index.css';
export function Button() {
    return (
        <button className='button-t'>
            <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='8426' width='24' height='24'>
                <path
                    fill='#9138e3'
                    d='M835.584 63.488q26.624 0 49.664 10.24t40.448 27.648 27.648 40.448 10.24 49.664l0 641.024q0 26.624-10.24 49.664t-27.648 40.448-40.448 27.648-49.664 10.24l-448.512 0q-26.624 0-49.664-10.24t-40.448-27.648-27.648-40.448-10.24-49.664l0-192.512 128 0 0 192.512 448.512 0 0-641.024-448.512 0 0 192.512-128 0 0-192.512q0-26.624 10.24-49.664t27.648-40.448 40.448-27.648 49.664-10.24l448.512 0zM513.024 614.4q0-19.456-9.728-28.672t-24.064-9.216l-378.88 0q-14.336 0-25.088-7.68t-10.752-26.112l0-52.224q0-29.696 9.216-37.376t35.84-7.68l31.744 0q24.576 0 58.368 0.512t73.728 1.024 77.312 1.024 69.12 0.512l51.2 0q22.528 0 32.256-16.384t9.728-35.84l0-49.152q0-20.48 8.704-25.6t26.112 9.216 47.104 32.768 61.952 37.888 62.976 38.4 49.152 34.304q14.336 11.264 14.336 30.72t-11.264 28.672q-16.384 14.336-44.544 32.256t-59.392 36.864-60.928 37.376-48.128 33.792q-23.552 19.456-34.816 19.968t-11.264-30.208l0-49.152z'
                    p-id='8427'></path>
            </svg>
            Start diagnosis
        </button>
    );
}

export const UpdataButton = () => (
    <button className='continue-application'>
        <div>
            <div className='pencil'></div>
            <div className='folder'>
                <div className='top'>
                    <svg viewBox='0 0 24 27'>
                        <path d='M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z'></path>
                    </svg>
                </div>
                <div className='paper'></div>
            </div>
        </div>
        Upload the image files
    </button>
);

export const LetfButton = () => (
    <>
        <button className='style_navButtonPrev__ImyzC '>
            <svg className='guideSvg' width='54' height='54' viewBox='0 0 54 54' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    fill='#586ee0'
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M31.8023 13.7327C32.3013 14.2317 32.3013 15.0407 31.8023 15.5397L20.5089 26.8332L31.8023 38.1266C32.3013 38.6256 32.3013 39.4347 31.8023 39.9337C31.3033 40.4327 30.4943 40.4327 29.9953 39.9337L17.7983 27.7367C17.2993 27.2377 17.2993 26.4287 17.7983 25.9297L29.9953 13.7327C30.4943 13.2337 31.3033 13.2337 31.8023 13.7327Z'></path>
            </svg>
        </button>
    </>
);

export const RightButton = () => (
    <button className='style_navButtonPrev__ImyzC '>
        <svg className='guideSvg' width='200' height='200' viewBox='0 0 54 54' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                fill='#586ee0'
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M21.8643 39.934C21.3653 39.435 21.3653 38.626 21.8643 38.127L33.1577 26.8335L21.8643 15.5401C21.3653 15.0411 21.3653 14.232 21.8643 13.733C22.3633 13.234 23.1723 13.234 23.6713 13.733L35.8683 25.93C36.3673 26.429 36.3673 27.238 35.8683 27.737L23.6713 39.934C23.1723 40.433 22.3633 40.433 21.8643 39.934Z'></path>
        </svg>
    </button>
);

export const ViewButton = () => (
    <button className='button-t h-[2rem]'>
        <svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6410' width='20' height='20'>
            <path
                d='M896 64H128c-35.296 0-64 28.704-64 64v768c0 35.296 28.704 64 64 64h592a32 32 0 1 0 0-64H128V128h768v592a32 32 0 1 0 64 0V128c0-35.296-28.704-64-64-64z'
                p-id='6411'></path>
            <path
                d='M791.744 746.496A206.752 206.752 0 0 0 832 624c0-114.688-93.312-208-208-208S416 509.312 416 624s93.312 208 208 208a206.752 206.752 0 0 0 122.496-40.256l110.88 110.88a31.904 31.904 0 0 0 45.248 0 31.968 31.968 0 0 0 0-45.248l-110.88-110.88zM480 624c0-79.392 64.608-144 144-144s144 64.608 144 144-64.608 144-144 144-144-64.608-144-144zM800 264a32 32 0 0 0-32-32H256a32 32 0 0 0 0 64h512a32 32 0 0 0 32-32zM256 422.656a32 32 0 0 0 0 64h96a32 32 0 0 0 0-64H256z'
                p-id='6412'></path>
        </svg>
        Ask for advice
    </button>
);
