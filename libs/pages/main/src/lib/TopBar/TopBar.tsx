import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';

import { isNil } from 'lodash-es';

import { logout, useAuth, useMessages } from '@deliveryapp/data-access';

import { StyledTopBar } from './StyledTopBar';

interface TopBarProps {
  showMessages: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ showMessages }) => {
  const menuRef = useRef<Menu>(null);
  const growl = useRef<Growl>(null);
  const history = useHistory();
  const [{ user }, dispatch] = useAuth();
  const [{ unread }] = useMessages();

  const [items] = useState([
    {
      label: 'Profile',
      icon: 'fa fa-user',
      command: () => {
        history.push('/profile');
      }
    },
    {
      label: 'Messages',
      icon: 'fa fa-envelope-o',
      command: () => {
        showMessages();
      }
    },
    {
      label: 'Logout',
      icon: 'fa fa-sign-out',
      command: async () => {
        try {
          await logout(dispatch, history);
        } catch (err) {
          !isNil(growl.current) &&
            growl.current.show({
              severity: 'error',
              summary: err.response.data.message
                ? err.response.data.message
                : 'Error',
              closable: false
            });
        }
      }
    }
  ]);

  const toggleUserMenu = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    !isNil(menuRef.current) && menuRef.current.toggle(event);
  };

  const toggleAppMenu = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const layout = document.querySelector('.layout');
    !isNil(layout) && layout.classList.toggle('layout-menu-active');
  };

  return (
    <StyledTopBar>
      <Growl ref={growl} />
      <div className="topbar">
        <Link className="topbar-logo" to="/">
          <i className="fa fa-clock-o"></i>
        </Link>
        <a href="/" id="menu-button" onClick={toggleAppMenu}>
          <i className="fa fa-bars"></i>
        </a>
        <a
          id="user-display"
          data-testid="menu"
          href="/"
          onClick={toggleUserMenu}
        >
          {user?.firstName && (
            <span className="username">{user?.firstName}</span>
          )}
          {user?.lastName && <span className="username">{user?.lastName}</span>}
          {!user?.firstName && !user?.lastName && (
            <span className="username">{user?.email}</span>
          )}
          <img src="/assets/icons/avatar.svg" alt="avatar" />
          <span className="topbar-badge" data-testid="unread">
            {unread}
          </span>
          <i className="fa fa-angle-down"></i>
        </a>
        <Menu model={items} popup={true} ref={menuRef} />
        <label htmlFor="topbar-search">
          <i className="fa fa-search topbar-search-icon"></i>
        </label>
        <InputText
          className="topbar-search"
          id="topbar-search"
          placeholder="Search..."
        />
      </div>
    </StyledTopBar>
  );
};
