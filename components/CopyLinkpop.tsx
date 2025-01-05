import { useParams } from 'next/navigation'
import React from 'react'

const CopyLinkpop = () => {
    const link = useParams();
    const baseurl = `https://localhost:3000`
    const url = baseurl + link.id;
    console.log(link);
    return (
        <div className='w-[20rem] h-[15rem] rounded-md bg-white text-black absolute bottom-[2rem] flex flex-wrap justify-center items-center left-5'>
            <h1 className='text-[.8rem]'>{url}</h1>
        </div>
    )
}

export default CopyLinkpop