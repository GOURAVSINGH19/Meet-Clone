import CallList from '@/components/CallLists'
import React from 'react'

const recording = () => {
  return (
    <section className="w-full h-screen flex size-full flex-col gap-5 text-white ">
      <h1 className='text-xl'>recording</h1>
      <CallList type='recording' />
    </section>
  )
}

export default recording