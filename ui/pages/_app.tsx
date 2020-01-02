import React from 'react';
import App from 'next/app';
import NavBar from '../components/common/nav';
import '../styles/index.css';

class CustomApp extends App {

  static async getInitialProps( { Component, ctx, } ) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return ({pageProps})
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <NavBar/>
        <div className='container w-full mx-auto pt-20'>
          <div className="w-full px-8 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    )
  }
}

export default CustomApp;