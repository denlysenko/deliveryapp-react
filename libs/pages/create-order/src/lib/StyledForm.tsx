import styled from 'styled-components';

export const StyledForm = styled.div`
  .p-col-12,
  .p-col-6 {
    padding: 15px 50px;
  }

  form {
    width: 100%;
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
    .fa-phone {
      top: 7px;
    }

    .fa-envelope-o {
      top: 6px;
    }
  }

  .button-container {
    text-align: center;

    .ui-button {
      width: auto;
    }
  }
`;
