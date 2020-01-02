import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import * as cookie from 'js-cookie'
import * as jwt_decode from 'jwt-decode'

export default() => {

  const isAuthenticated = (): boolean => {
    if (typeof  window === 'undefined') return false
    const raw_token = localStorage.getItem('token')
    if (!raw_token) return false
    const token = jwt_decode(raw_token)
    return token.exp > Math.round(new Date().getTime() / 1000);
  }

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = isAuthenticated()
    setAuthenticated(authenticated)
    window.addEventListener('storage', (event) => {
      setAuthenticated(isAuthenticated)
    })
  })

  const clearToken = () => {
    localStorage.removeItem('token');
    cookie.remove('token');
    setAuthenticated(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6 shadow-lg">
    <div className="flex items-center text-white mr-6">
      <span className="font-semibold text-xl tracking-tight">
        <Link href={'/'}>
          Meets
        </Link>
      </span>
    </div>
    <div className="font-semibold text-md tracking-tight text-white">
      <Link href={'/'}>
        {authenticated ? (
          <button onClick={clearToken}>
            <span >
              Logout
            </span>
          </button>
        ) : <button>Login</button>}
      </Link>
    </div>
  </nav>
)};