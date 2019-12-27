import React from 'react'
import Head from 'next/head'
import Link from 'next/link';

const Home = (props) => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div className="px-8 py-12">
      <img src='/meeting_room.jpg' className='object-cover rounded-lg h-48 w-full' alt='meeting image'/>
      <h1 className='mt-8 text-4xl font-bold text-gray-900 leading-tight'>Browse for events or
        <span className='text-indigo-500'><Link href={'/events/create'}><a> create your own!</a></Link></span></h1>
      <p className='mt-2 text-gray-600 sm:text-xl'>Meets helps you find events to attend and meet others with the same interests</p>
      <div className='py-12'>
        <Link href={'/events/create'}>
          <a className='btn text-base shadow-xl'>See what's happening close by</a>
        </Link>
      </div>
    </div>

  </div>
);

export default Home