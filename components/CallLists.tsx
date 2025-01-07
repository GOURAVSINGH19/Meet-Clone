'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/Hook/useGetcall';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from './ui/toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recording' }) => {
    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
        useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recording':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recording':
                return 'No Recordings';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(
                    callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
                );

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);

                setRecordings(recordings);
            } catch (e) {
                Toast({ title: "Try later" })
                console.error(e);
            }
        };

        if (type === 'recording') {
            fetchRecordings();
        }
    }, [type, callRecordings]);

    if (isLoading) return <Loader />;

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting as Call).id}
                        icon={
                            type === 'ended'
                                ? '/icons/previous.svg'
                                : type === 'upcoming'
                                    ? '/icons/upcoming.svg'
                                    : '/icons/recordings.svg'
                        }
                        title={
                            (meeting as Call).state?.custom?.description ||
                            (meeting as CallRecording).filename?.substring(0, 20) ||
                            'Personal Meeting'
                        }
                        date={
                            (meeting as Call).state?.startsAt?.toLocaleString() ||
                            (meeting as CallRecording).start_time?.toLocaleString()
                        }
                        isPreviousMeeting={type === 'ended'}
                        link={
                            type === 'recording'
                                ? (meeting as CallRecording).url
                                : `${process.env.Base_Url}/meeting/${(meeting as Call).id}`
                        }
                        buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recording' ? 'Play' : 'Start'}
                        handleClick={
                            type === 'recording'
                                ? () => router.push(`${(meeting as CallRecording).url}`)
                                : () => router.push(`/meeting/${(meeting as Call).id}`)
                        }
                    />
                ))
            ) : (
                <h1 className="text-xl  font-bold text-white ">{noCallsMessage}</h1>
            )}
        </div>
    );
};

export default CallList;