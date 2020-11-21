import React from 'react';
import App from 'next/app';

import '../styles/antd.less';

class SwsApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="App">
        <Component {...pageProps} />
      </div>
    );
  }
}

export default SwsApp;
