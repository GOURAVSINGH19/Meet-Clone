import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({ setisSetupComplete }: { setisSetupComplete: (value: boolean) => void }) => {
    const [isMinCamToggledOn, setIsMicCamToggleOn] = useState(false);

    const call = useCall();
    if (!call) throw new Error('usecall must be used within StreamCall component');

    useEffect(() => {
        if (!isMinCamToggledOn) {
            call?.camera.enable();
            call?.microphone.enable();
        } else {
            call?.camera.disable();
            call?.microphone.disable();
        }

    }, [isMinCamToggledOn, call?.camera, call?.microphone]);

    return (
        <div className='w-screen text-white  h-screen flex justify-start items-center flex-col p-[2.5rem]'>
            <h1 className='text-2xl font-bold mb-5'>Setup</h1>
            <VideoPreview />
            <div className='flex w-full justify-center items-center gap-10 p-5'>
                <label htmlFor="flex items-center justify-center gap-2 medium">
                    <input
                        className='mr-2'
                        type="checkbox"
                        checked={isMinCamToggledOn}
                        onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
                    />
                    join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => { call.join(); setisSetupComplete(true) }}>
                join Meeting
            </Button>
        </div >
    )
}

export default MeetingSetup