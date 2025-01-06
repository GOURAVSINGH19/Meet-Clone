'use client'
import Loader from '@/components/Loader';
import { useGetCallById } from '@/Hook/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useParams } from 'next/navigation';
import { Alert } from '@/components/ui/alert';

const Meeting = () => {
  const { id } = useParams();

  if (!id) throw new Error("Id is required");

  const { call, isCallLoading } = useGetCallById(id);
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false)
  if (!isLoaded || isCallLoading) return <Loader />

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  return (
    <div className='w-full h-screen'>
      <StreamCall call={call}>
        <StreamTheme as="main" className='bg-black w-full h-full' >
          {
            !isSetupComplete ? (
              <MeetingSetup setisSetupComplete={setisSetupComplete} />
            ) : <MeetingRoom />
          }
        </StreamTheme>
      </StreamCall>
    </div>
  )
}

export default Meeting