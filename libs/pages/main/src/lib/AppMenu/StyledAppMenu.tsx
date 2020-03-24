import styled from 'styled-components';

export const StyledAppMenu = styled.div`
  .menu-wrapper {
    position: fixed;
    top: 70px;
    height: 100%;
    width: 75px;
    border-right: solid 1px #dee4e9;
    background-color: white;
    transition: left 0.3s;

    @media (min-width: 641px) {
      overflow: visible;
      z-index: 100;
    }

    .menu {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        position: relative;

        > a {
          position: relative;
          text-decoration: none;
          display: block;

          button {
            width: 100%;
            padding: 16px;
            font-size: 13px;
            text-align: center;
            color: #7d8286;
            border: none;
            background-color: transparent;
          }

          &:hover,
          &.active {
            background-color: #f6f9fb;
          }

          &.active button {
            color: #3984b8;
          }
        }
      }

      .fa {
        font-size: 19px;
      }
    }
  }
`;
