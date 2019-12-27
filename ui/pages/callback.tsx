import React, { useEffect, useState } from 'react'
import Router from 'next/router';
import {login} from '../utils/auth';

const Callback = () => {

  useEffect(() => {
    const { asPath } = Router;
    const params: string[] = asPath.split("#")[1].split('&');
    const id_token = urlParamExtract("id_token", params);
    login(id_token);
  });

  const urlParamExtract = (key: string, params: string[]) =>
    params.find(p => p.startsWith(`${key}=`)).replace(`${key}=`, '');

  return (<></>)

};

export default Callback;