import styled from 'styled-components';

export const StyledForm = styled.div`
  .card {
    height: 100%;

    &.no-margin-bottom {
      margin-bottom: 0;
    }
  }

  form {
    width: 100%;
  }

  .row {
    padding: 10px 0;
  }

  .input-wrapper {
    position: relative;

    .p-inputtext {
      width: 100%;
    }

    .fa {
      position: absolute;
      width: 14px;
      right: 8px;
      font-size: 14px;
      color: #dee4e9;
    }

    .fa-building-o,
    .fa-globe,
    .fa-info,
    .fa-user-circle-o,
    .fa-phone,
    .fa-lock,
    .fa-credit-card {
      top: 7px;
    }

    .fa-envelope-o {
      top: 6px;
    }
  }
`;
