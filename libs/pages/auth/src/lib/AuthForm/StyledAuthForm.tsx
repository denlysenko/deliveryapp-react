import styled from 'styled-components';

export const StyledAuthForm = styled.div`
  .p-col-12 {
    padding: 15px 100px;

    @media (max-width: 640px) {
      padding: 15px 50px;
    }
  }

  .error-message {
    padding: 0 100px;
  }

  .input-wrapper {
    position: relative;

    input {
      width: 100%;
    }

    .fa {
      position: absolute;
      width: 14px;
      right: 8px;
      font-size: 14px;
      color: #dee4e9;
    }

    .fa-user-circle-o,
    .fa-building-o,
    .fa-phone {
      top: 7px;
    }

    .fa-lock,
    .fa-envelope-o {
      top: 6px;
    }
  }

  button {
    padding: 0;
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
`;
