import styled, { css } from 'styled-components';

const ShowModal = css`
  visibility: visible;
  opacity: 1;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 560px;
  height: auto;
  padding: 25px 15px 20px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 15px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 10;
  transition: all 0.3s ease-in-out;
  ${({ show }) => show && ShowModal}
`;

export const ModalMask = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  transition: all 0.3s ease-in-out;
  ${({ show }) => show && ShowModal}
`;

export const ModalClose = styled.i`
  width: 20px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 5;
  cursor: pointer;
`;
