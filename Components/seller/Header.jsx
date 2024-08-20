import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='bg-black text-white  w-full p-6 flex flex-row items-center justify-center'>
        <div className='flex flex-row items-center justify-center gap-4'>
            <p>Products</p>
            <p></p>
        </div>
        <Button className="ml-[200px]">Switch to Buyer</Button>
    </div>
  )
}

export default Header 