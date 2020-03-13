import styled from 'styled-components';

export const StyledAuth = styled.div`
  height: auto;

  .login-panel {
    width: 600px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 125px;
    border: 1px solid #dee4e9;

    &.registration {
      margin-top: 50px;
    }

    @media (max-width: 640px) {
      width: 100%;
      margin-top: 100px;
    }
  }

  .logo-container {
    padding: 50px 50px 25px;
    border-bottom: 8px solid #dee4e9;
    margin-bottom: 20px;

    .fa-shield,
    .fa-sign-in {
      height: 50px;
      font-size: 50px;
      color: #dee4e9;
    }

    .fa-sign-in {
      float: right;
    }

    h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #7d8286;
      font-size: 16px;
      font-weight: 300;
      margin-top: 12px;
      margin-bottom: 0;

      a {
        font-size: 12px;
      }
    }
  }
`;
