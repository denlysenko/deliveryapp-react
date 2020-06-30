import styled from 'styled-components';

export const StyledMessages = styled.div`
  height: calc(100% - 36px);

  .card {
    margin-top: 20px;
    height: 100%;
    overflow-y: auto;
  }

  .p-message {
    display: flex;
    flex-direction: column;
    margin: 0.8em 0;
    position: relative;
  }

  .status-icon {
    display: block;
    position: absolute;
    top: 7px;
    right: 7px;
    height: 10px;
    width: 10px !important;
    border-radius: 50%;
    background: #3eb839;
    border-color: #3eb839;
    cursor: pointer;

    &:hover {
      background: #3eb839 !important;
      border-color: #3eb839 !important;
    }

    .pi {
      font-size: 8px;
    }
  }

  .p-message.read {
    background: #f2f8fa;
    border: 1px solid #bfe0fa;

    .status-icon {
      display: none;
    }
  }

  .date {
    font-size: 10px;
    margin-left: auto;
  }
`;
