import { NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import Router from 'next/router';

//taken from : https://dev.to/jolvera/user-authentication-with-nextjs-4023
const loginUrl = 'https://meets-dev.auth.us-east-2.amazoncognito.com/login?client_id=4ksagn3c8b53qee8almt63bo08&response_type=token&redirect_uri=http://localhost:3000/callback';

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, {Location: loginUrl});
    ctx.res.end();
    return
  }

  if (!token) {
    Router.push(loginUrl);
  }

  return token;
};