import styled from 'styled-components';

export const StyledUpdateOrder = styled.div`
  form {
    width: 100%;
    padding: 0;
  }

  .actions {
    button {
      width: 150px;
      margin: 0 16px;
    }
  }

  h2,
  h4 {
    padding: 0.5em;
  }

  h4 {
    margin-top: 0;
  }

  .card {
    &.no-margin-bottom {
      margin-bottom: 0;
    }

    .row {
      padding: 10px 0.5em;
    }

    .p-dropdown,
    .p-calendar {
      width: 100%;
    }

    .p-calendar {
      .p-inputtext {
        width: calc(100% - 2em);
      }
    }
  }
`;
