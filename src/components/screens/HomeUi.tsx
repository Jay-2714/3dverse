'use client'
import React from 'react'; 
import TextField3d from '../TextField3d';
import { FaSearch } from "react-icons/fa";
export const HomeUi = () => {

    const [value, setValue] = React.useState('');
    return(
        <div className='flex flex-col bg-lightBackground h-full'>
            <div className='flex justify-center w-full'>
        <TextField3d 
        trailingIcon={<FaSearch className='text-gray-500 mr-3' />}
        ParentCss={`md:w-1/3 w-1/2 rounded-full mt-3 text-white`}
        className={`pl-10  button rounded-full p-4 text-gray-600 placeholder:text-grsy-600`}
        change={(e) => setValue(e.target.value)} 
        placeholder='Search...'
        onClick={() => console.log("")} 
        type='text'
        value={value}/>
        </div>
    </div>
    );
}