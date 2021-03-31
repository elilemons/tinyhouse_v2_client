import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Input, Layout } from 'antd';
import { MenuItems } from './components';

import logo from './assets/tinyhouse-logo.png';
import { Viewer } from '../../lib/types';
import { displayErrorMessage } from '../../lib/utils';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;
const { Search } = Input;

export const AppHeader = withRouter(
  ({ viewer, setViewer, location, history }: Props & RouteComponentProps) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
      const { pathname } = location;
      const pathnameSubStrings = pathname.split('/');

      if (!pathname.includes('/listings')) {
        setSearch('');
        return;
      }

      if (pathname.includes('/listings') && pathnameSubStrings.length === 3) {
        setSearch(pathnameSubStrings[2]);
        return;
      }
    }, [location]);

    const onSearch = (value: string) => {
      const trimmedValue = value.trim();

      if (trimmedValue) {
        history.push(`/listings/${trimmedValue}`);
      } else {
        displayErrorMessage('Please enter a valid value.');
      }
    };

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
          <div className="app-header__search-input">
            <Search
              placeholder="Search 'Sans Fransisco'"
              enterButton
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              onSearch={onSearch}
            />
          </div>
        </div>
        <div className="app-header__menu-section">
          <MenuItems viewer={viewer} setViewer={setViewer} />
        </div>
      </Header>
    );
  },
);
