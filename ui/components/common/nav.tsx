import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import * as cookie from 'js-cookie';

export default() => {
  const [authenticated, setAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('id_token');
  });

  const clearToken = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    cookie.remove('access_token');
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6 shadow-lg">
    <div className="flex items-center text-white mr-6">
      <span className="font-semibold text-xl tracking-tight">Meets</span>
    </div>
    <div className="text-sm">
      <Link href={'/'}>
        {authenticated ? (
          <button onClick={clearToken}><a>Logout</a></button>
        ) : <button><a>Login</a></button>}
      </Link>
    </div>
  </nav>
)};