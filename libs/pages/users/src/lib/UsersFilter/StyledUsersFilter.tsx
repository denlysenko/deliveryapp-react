import styled from 'styled-components';

export const StyledUsersFilter = styled.div`
  .users-filter {
    .p-md-6 {
      padding: 0;
    }

    .p-inputgroup {
      @media (max-width: 767px) {
        margin-bottom: 16px;
      }

      input {
        @media (min-width: 641px) {
          margin-right: 16px;
        }
      }
    }
  }
`;
