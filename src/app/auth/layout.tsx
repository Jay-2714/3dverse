import React from 'react'

export default function Authlayout({children}: {children: React.ReactNode})  {

  return (
    <div className='bg-black h-full w-full'>
        {children}
    </div>
  )
}
