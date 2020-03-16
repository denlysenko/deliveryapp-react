import styled from 'styled-components';

export const StyledTopBar = styled.div`
  .topbar {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    color: #757575;
    height: 70px;
    padding: 12px 15px;
    border-bottom: solid 1px #dee4e9;
    z-index: 100;
    background-color: white;
    background-image: linear-gradient(to right, white, white);

    a {
      color: #757575;
    }

    &-logo {
      .fa {
        font-size: 44px;
        vertical-align: middle;
        color: #3984b8;
      }

      @media (max-width: 640px) {
        width: 144px;
        display: block;
        margin: 0 auto;
        text-align: center;
      }
    }

    &-search {
      vertical-align: middle;
      border: 0 none;
      background-color: transparent;
      color: #757575;
      transition: color 0.3s;

      @media (max-width: 640px) {
        display: none;
      }
    }

    &-badge {
      position: absolute;
      top: -8px;
      right: -6px;
      background-color: #3eb839;
      padding: 2px 8px;
      display: block;
      margin-top: -2px;
      color: white;
      border-radius: 2px;
    }

    .fa-search {
      font-size: 16px;
      vertical-align: middle;
      margin-left: 36px;

      @media (max-width: 640px) {
        display: none;
      }
    }
  }

  #menu-button {
    font-size: 24px;
    float: left;
    margin-left: 0;
    margin-top: -36px;
    @media (min-width: 641px) {
      display: none;
    }
  }

  #user-display {
    position: relative;
    float: right;
    text-align: right;
    margin-top: 2px;
    text-decoration: none;

    @media (max-width: 640px) {
      margin-top: -42px;
    }

    .username {
      transition: color 0.3s;
      vertical-align: middle;
      color: #757575;
      margin-right: 8px;

      @media (max-width: 640px) {
        display: none;
      }
    }

    img {
      vertical-align: middle;
      width: 40px;
      margin-right: 8px;
    }

    .fa {
      transition: color 0.3s;
      font-size: 16px;
      vertical-align: middle;
      color: #757575;
    }
  }

  .p-menu {
    width: 250px;

    .p-menuitem-link {
      font-weight: 300;
      color: #7d8286;
      padding: 10px 16px;

      &.ui-state-active {
        color: #3984b8;
        background-color: #f6f9fb;
      }

      &:hover {
        background-color: #f6f9fb;
      }
    }
  }
`;
