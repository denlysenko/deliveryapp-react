import styled from 'styled-components';

export const StyledPaymentForm = styled.div`
  .row {
    padding: 15px 0.5em;
  }

  .p-dropdown,
  .p-calendar,
  .p-inputnumber {
    width: 100%;
  }

  .p-calendar {
    .p-inputtext {
      width: calc(100% - 2em);
    }
  }

  .action {
    .p-button {
      width: 150px;
    }
  }
`;
