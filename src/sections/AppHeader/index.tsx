import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuItems } from './components';

import logo from './assets/tinyhouse-logo.png';
import { Viewer } from '../../lib/types';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img
              src={logo}
              alt="The TinyHouse logo. A medium blue capital letter 'H', A tiny white house seemingly cut out of the bottom of the 'H' is in front with a matching blue window."
            />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
