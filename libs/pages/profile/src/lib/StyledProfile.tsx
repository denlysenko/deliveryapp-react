import styled from 'styled-components';

import { StyledForm } from './StyledForm';

export const StyledProfile = styled(StyledForm)`
  #profileForm {
    @media screen and (min-width: 64.063em) {
      display: flex;
    }
  }

  button {
    width: 150px;
  }
`;
