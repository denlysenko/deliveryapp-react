import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';

import { isNil } from 'lodash-es';

import { useAuth, logout } from '@deliveryapp/data-access';

import { StyledTopBar } from './StyledTopBar';

interface TopBarProps {
  showMessages: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ showMessages }) => {
  const menuRef = useRef<Menu>(null);
  const history = useHistory();
  const [{ user }, dispatch] = useAuth();

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
      command: () => {
        logout(dispatch, history);
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
          <span className="topbar-badge">0</span>
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
