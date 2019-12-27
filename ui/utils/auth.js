import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import * as jwt_decode from 'jwt-decode'

export const login = ( id_token ) => {
  localStorage.setItem('token', id_token);
  const token = jwt_decode(id_token);
  cookie.set('token', token, {expires: token.expires})
  Router.push('/')
}

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: process.env.LOGIN_URL })
      ctx.res.end()
      return {}
    } else {
      window.location.href = process.env.LOGIN_URL
      return {}
    }
  }
  return token
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/')
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/')
      }
    }

    useEffect(() => {
      console.log('written')
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])
    return (
      <WrappedComponent {...props} />
    )
  }

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx)


    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}