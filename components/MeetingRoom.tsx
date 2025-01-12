import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { LayoutList, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import CopyLinkpop from './CopyLinkpop'

type callLayoutType = 'Grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const route = useRouter();
    const [Layout, setLayout] = useState<callLayoutType>()
    const [showParticipants, setShowParticipants] = useState(false)

    const { useCallCallingState } = useCallStateHooks();
    const CallState = useCallCallingState();

    if (CallState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (Layout) {
            case 'Grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />;
            default:
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    }
    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-dark-2">
            <div className='absolute top-[.5rem] left-5 z-10  rounded-lg'>
                <CopyLinkpop />
            </div>
            <div className="relative h-full top-0 lef-0 flex  items-center justify-center">
                <div className=" flex h-full  w-[50rem] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('hidden ml-2', {
                        'show-block': showParticipants,
                    })}
                >
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5">
                <CallControls onLeave={() => route.push(`/`)} />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    className='cursor-pointer'
                                    onClick={() =>
                                        setLayout(item.toLowerCase() as callLayoutType)
                                    }
                                >
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="border-dark-1" />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />
                <button onClick={() => setShowParticipants(prev => !prev)}>
                    <div className='cursor-pointer relative  rounded-full p-2 hover:bg-[#4c535b]'>
                        <Users size={20} className='text-white' />
                    </div>
                </button>
                {
                    !isPersonalRoom && <EndCallButton />
                }
            </div>
        </section>
    )
}

export default MeetingRoom