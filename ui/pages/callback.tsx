import React, { useEffect } from 'react'
import Router from 'next/router';
import * as cookie from 'js-cookie';

const Callback = () => {

  useEffect(() => {
    const { asPath } = Router;
    const params: string[] = asPath.split("#")[1].split('&');
    const id_token = urlParamExtract("id_token", params);
    const token = urlParamExtract("access_token", params);
    localStorage.setItem('access_token', token);
    localStorage.setItem('id_token', id_token);
    cookie.set('access_token', token);
  });

  const urlParamExtract = (key: string, params: string[]) =>
    params.find(p => p.startsWith(`${key}=`)).replace(`${key}=`, '');

  return (
    <div>Authenticated</div>
  )

};

export default Callback;