import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { RxCross1 } from "react-icons/rx";
const CopyLinkpop = () => {
    const [visible, setVisibile] = useState<ReactNode>(true);
    const link = useParams();
    const meetingLink = `localhost:3000/meeting/${link?.id}`;
    return (
        <>
            {visible && <div className='w-full rounded-md  text-white bg-[#1166ee8f] relative'>
                <Button onClick={() => setVisibile(false)}>
                    <RxCross1 className='bg-transparent border-none' />
                </Button>
                <div className="w-[20vw] h-[15vh]  flex justify-center items-center flex-col gap-5">
                    <h1>Meeting-Link</h1>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(meetingLink);
                            toast({
                                title: "Link Copied",
                            })
                        }}
                        className="bg-dark-2 px-6"
                    >
                        <Image
                            src="/icons/copy.svg"
                            alt="feature"
                            width={20}
                            height={20}
                        />
                        &nbsp; Copy Link
                    </Button>
                </div>
            </div>
            }
        </>
    )
}

export default CopyLinkpop