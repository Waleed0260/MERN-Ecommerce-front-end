import React from 'react'
import Button from "./ui/button"
const Hero = () => {
  return (
    <>
    <div
className="w-full flex flex-col items-center justify-center bg-cover h-[39rem] overflow-hidden relative"
>
<div
  className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center hero-animation"
  style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20220929/pngtree-shoes-promotion-banner-background-image_1466238.jpg')` }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <p className="font-bold text-3xl text-white heading relative">Top fashion for MEN</p>
  <p>BEST FASHION FOR MAN</p>
  <Button>LEARN MORE</Button>
</div>
</div>

  </>
  )
}

export default Hero