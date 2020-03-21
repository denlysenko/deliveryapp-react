import styled from 'styled-components';

export const StyledCreateOrder = styled.div`
  .p-steps-item {
    width: 33.333%;

    .p-menuitem-link {
      .p-steps-number {
        @media (max-width: 640px) {
          margin-bottom: 2.5em !important;
        }
      }

      .p-steps-title {
        @media (max-width: 640px) {
          display: none !important;
        }
      }
    }
  }

  .card {
    margin-bottom: 0;
    height: calc(100vh - 99px);
  }

  .ui-widget-content {
    padding: 15px 0;
    width: auto;

    .ui-inputtext {
      font-weight: 300;
    }

    @media (min-width: 1100px) {
      width: 960px;
      margin: 0 auto;
    }
  }
`;
