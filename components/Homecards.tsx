import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Homecards = ({ img, title, desc, className, handleClick }: { img: string, title: string, desc: string, className: string, handleClick: () => void }) => {
    return (
        <div className={cn('px-4 py-6 flex flex-col justify-between  w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)} onClick={handleClick}>

            <div className='flex justify-center items-center glassmorphism size-12 rounded-[10px]'>
                <Image src={img} alt='add-meeting' width={27} height={27} />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-2xl font-bold'>{title}</p>
                <p className='text-lg font-normal'>{desc}</p>
            </div>
        </div>
    )
}

export default Homecards