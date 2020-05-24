import styled from 'styled-components';

export const StyledPaymentsList = styled.div`
  .payment-filter {
    padding: 0;
  }

  .button {
    margin-bottom: 16px;
    padding: 0;
    text-align: right;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  .topbar {
    margin-bottom: 16px;
  }
`;
