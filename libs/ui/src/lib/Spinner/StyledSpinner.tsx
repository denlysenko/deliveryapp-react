import styled from 'styled-components';

export const StyledSpinner = styled.div`
  .spinner {
    position: fixed;
    padding: 0px;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9998;
    background: black;
    opacity: 0.6;
    transition: opacity 0.3s linear;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .la-ball-clip-rotate-multiple,
  .la-ball-clip-rotate-multiple > div {
    position: relative;
    box-sizing: border-box;
  }

  .la-ball-clip-rotate-multiple {
    display: block;
    font-size: 0;
    color: #3984b8;
  }

  .la-ball-clip-rotate-multiple > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }

  .la-ball-clip-rotate-multiple {
    width: 32px;
    height: 32px;
  }

  .la-ball-clip-rotate-multiple > div {
    position: absolute;
    top: 50%;
    left: 50%;
    background: transparent;
    border-style: solid;
    border-width: 2px;
    border-radius: 100%;
    animation: ball-clip-rotate-multiple-rotate 1s ease-in-out infinite;
  }

  .la-ball-clip-rotate-multiple > div:first-child {
    position: absolute;
    width: 32px;
    height: 32px;
    border-right-color: transparent;
    border-left-color: transparent;
  }

  .la-ball-clip-rotate-multiple > div:last-child {
    width: 16px;
    height: 16px;
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }

  .la-ball-clip-rotate-multiple.la-3x {
    width: 96px;
    height: 96px;
  }

  .la-ball-clip-rotate-multiple.la-3x > div {
    border-width: 6px;
  }

  .la-ball-clip-rotate-multiple.la-3x > div:first-child {
    width: 120px;
    height: 120px;
  }

  .la-ball-clip-rotate-multiple.la-3x > div:last-child {
    width: 88px;
    height: 88px;
  }

  .la-ball-clip-rotate-multiple.la-3x > div:nth-child(2) {
    width: 48px;
    height: 48px;
  }

  @keyframes ball-clip-rotate-multiple-rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    50% {
      transform: translate(-50%, -50%) rotate(180deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
