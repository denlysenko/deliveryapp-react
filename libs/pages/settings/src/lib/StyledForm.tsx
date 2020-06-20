import styled from 'styled-components';

export const StyledForm = styled.div`
  .row {
    padding: 10px 0;
  }

  .input-wrapper {
    position: relative;

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

  button {
    width: 150px;
  }
`;
