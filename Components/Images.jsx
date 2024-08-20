import React from 'react'
import glasses from "../public/images/glasses.jpg"
import men from "../public/images/men.jpg"
import shoes from "../public/images/shoes.jpg"
import watches from "../public/images/watches.jpg"
import Image from 'next/image'

const Images = () => {
    const images = [
        {
            img: glasses
        },
        {
            img:shoes,
        },
        {
            img: shoes
        },
        {
            img: watches
        },
        {
            img: men
        }
    ]
  return (
    <>
    <div className='grid grid-cols-2 p-4 w-[80%]'>
    {images.map((item, index)=>{
        return(
            <div key={index}>
                <Image src={item.img} alt="img"/>
            </div>
        )
    })}
    </div>
    </>
  )
}

export default Images