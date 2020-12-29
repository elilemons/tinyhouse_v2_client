import React from 'react';
import { Layout } from 'antd';

import logo from './assets/tinyhouse-logo.png';

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <img
            src={logo}
            alt="The TinyHouse logo. A medium blue capital letter 'H', A tiny white house seemingly cut out of the bottom of the 'H' is in front with a matching blue window."
          />
        </div>
      </div>
    </Header>
  );
};
