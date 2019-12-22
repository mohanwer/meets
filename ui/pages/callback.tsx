import React from 'react'
import Router from 'next/router';
// import axios from 'axios';

interface Props {
    id_token: string,
    access_token: string,
    expires_in: number,
    token_type: string
}

export default class Callback extends React.Component<any, any> {
  componentDidMount(): void {
    const { route, asPath } = Router;
    console.log(route);
    console.log(asPath)
  }

  render() {
    return (
      <div>Authenticated</div>
    )
  }
}