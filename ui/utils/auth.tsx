import React from 'react';
import { NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import { LOGIN_URL } from "./constants";
//taken from : https://dev.to/jolvera/user-authentication-with-nextjs-4023

export const auth = (ctx: NextPageContext) => {
  const { access_token } = nextCookie(ctx);

  if (ctx.req && !access_token) {
    ctx.res.writeHead(302, {Location: LOGIN_URL});
    ctx.res.end();
    return
  }

  if (!access_token)
    Router.push(LOGIN_URL);

  return access_token;
};

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export const withAuthSync = WrappedComponent =>
  class extends React.Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps (ctx) {
      const access_token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, access_token }
    }

    // New: We bind our methods
    constructor (props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount () {
      window.addEventListener('storage', this.syncLogout);
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    // New: Method to redirect the user when the event is called
    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/login');
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
};