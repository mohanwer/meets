import React from 'react'
import Link from 'next/link';

export default() => {
return (
  <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6 shadow-lg">
  <div className="flex items-center text-white mr-6">
    <span className="font-semibold text-xl tracking-tight">Meets</span>
  </div>
  <div className="text-sm">
    <Link href={'/'}>
      <a href="#responsive-header" className="block mt-4 inline-block mt-0 text-white mr-4">
        Home
      </a>
    </Link>
  </div>
</nav>
)};