'use client'
import React, { useState } from 'react'
import Homecards from './Homecards'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/hooks/use-toast';
import ReactDatePicker from "react-datepicker"
import { Input } from './ui/input';

const initialState = {
    dateTime: new Date(),
    description: '',
    link: ''
}

const MeetingTypeList = () => {
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [value, setvalue] = useState(initialState);
    const { toast } = useToast();
    const [CallDetails, setCallDetails] = useState<Call>()

    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    
    const createMeeting = async () => {
        if (!user || !client) return;

        try {
            if (!value.dateTime) {
                toast({
                    title: 'Please select a date and time',
                })
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create meeting');

            const startAt = value.dateTime.toISOString() ||
                new Date(Date.now()).toISOString();

            const desc = value.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description: desc,
                    }
                }
            })

            setCallDetails(call);

            if (!value.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: 'Meeting created',
            })

        } catch (err) {
            toast({
                title: 'Error creating meeting',
            })
            console.error('Error creating meeting', err);
        }
    }

    const meetingLink = `${process.env.Base_Url}/meeting/${CallDetails?.id}`;
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <Homecards
                img='/icons/add-meeting.svg'
                title='New Meeting'
                desc='start an instant meeting'
                className="bg-orange-1"
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <Homecards
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                desc="via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <Homecards
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                desc="Plan your meeting"
                className="bg-purple-1"
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <Homecards
                img="/icons/recordings.svg"
                title="View Recordings"
                desc="Meeting Recordings"
                className="bg-yellow-1"
                handleClick={() => router.push('/recording')}
            />
            {
                !CallDetails ?
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        handleClick={createMeeting}
                        title='Schedule Meeting'
                    >
                        <div className='w-full h-full flex flex-col justify-center gap-2.5 items-center'>
                            <label htmlFor="" className='text-base text-normal leading'>
                                Add a description
                            </label>
                            <textarea
                                className="w-full outline-none p-2 border-none bg-dark-3 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                                onChange={(e) => setvalue({ ...value, description: e.target.value })}
                            />
                        </div>
                        <div className='flex w-full flex-col gap-2'>
                            <label htmlFor="" className='text-base text-normal leading-[22px] text-sky-2'>
                                <ReactDatePicker showTimeSelect timeFormat='HH:mm' dateFormat="MMMM d, yyyy h:mm aa" className='w-full rounded-md bg-dark-3 p-2 focus:outline-none' selected={value.dateTime} onChange={(date) => setvalue({ ...value, dateTime: date! })} />
                            </label>
                        </div>
                    </MeetingModal> : (
                        <MeetingModal
                            isOpen={meetingState === 'isScheduleMeeting'}
                            onClose={() => setMeetingState(undefined)}
                            title="Meeting Created"
                            className="text-center"
                            handleClick={() => {
                                navigator.clipboard.writeText(meetingLink)
                                toast({
                                    title: "Link Copied"
                                })
                            }}
                            image='/icons/checked.svg'
                            buttonIcon='/icons/copy.svg'
                            buttonText='Copy Meeting Link'
                        />
                    )
            }
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(value.link)}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e) => setvalue({ ...value, link: e.target.value })}
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList