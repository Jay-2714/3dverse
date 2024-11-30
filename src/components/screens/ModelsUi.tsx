'use client'
import React from 'react'; 
// import TextField3d from '../TextField3d';
// import { FaSearch } from "react-icons/fa";
// import { Divider } from '@mui/material';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';
import { ModelCard } from '../cards/ModelCard';
export const ModelsUi = () => {
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];

    const [value, setValue] = React.useState('');
    return(
        <div className='flex flex-col bg-lightBackground h-full'>
            <div className='flex justify-center w-full p-2 flex-col'>
        {/* <TextField3d 
        trailingIcon={<div className='flex flex-row gap-2 group'><Divider orientation='vertical'  flexItem variant='fullWidth' sx={{}} className='group-hover:bg-blueColor border-1 mr-1'/> <FaSearch size={25} className='text-gray-400 mr-3 group-hover:text-blueColor group'/></div>}
        ParentCss={`md:w-1/3 w-70 rounded-full mt-3 text-white`}
        className={`pl-10  button rounded-full p-4 text-gray-600 placeholder:text-gray-400`}
        change={(e) => setValue(e.target.value)} 
        placeholder='Search...'
        onClick={() => console.log("")} 
        type='text'
        value={value}/> */}
        <PlaceholdersAndVanishInput  placeholders={placeholders} onChange={(e) => setValue(e.target.value)} onSubmit={() => console.log("")}/>
            <div className='flex grid gap-4'>
                <ModelCard title={"hello"} description={"sefSVASSVSVFDdWEEDHEHKwe iuiuerhuivuysjkkjxd  fiuwehfis jdvuh9u eoiu foijf iwehfiue hdiawudiasi"}/>
            </div>
        </div>
    </div>
    );
}