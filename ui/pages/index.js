import React from 'react'
import Head from 'next/head'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div className="px-8 py-12">
      <img src='/meeting_room.jpg' className='object-cover h-48 w-full' alt='meeting image'/>
      <h1 className='mt-6 text-2xl font-bold text-gray-900 leading-tight'>Browse for events or
        <span className='text-indigo-500'> create your own!</span></h1>
      <p className='mt-2 text-gray-600'>Meets helps you find events to attend and meet others with the same interests</p>

    </div>

  </div>
);

export default Home
