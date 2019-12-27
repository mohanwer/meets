import React from 'react'
import Link from 'next/link';

interface Props  {
  href: URL,
  children: React.ReactNode,
  OAuthSignIn: ()=> void
}

const ProtectedLink = (props: Props) => {
  const authenticated = false;
  if (authenticated)
    return (
      <Link href={props.href}>
        {props.children}
      </Link>
    );
  else
    return (
      <button onClick={props.OAuthSignIn}>
        {props.children}
      </button>
    );
};

export default ProtectedLink;