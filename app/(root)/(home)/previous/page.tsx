import CallList from '@/components/CallLists'
import React from 'react'

const previous = () => {
  return (
    <section className="w-full h-screen flex size-full flex-col gap-5 text-white ">
      <h1 className='text-xl'>Previous Calls</h1>
      <CallList type='ended'/>
    </section>
  )
}

export default previous