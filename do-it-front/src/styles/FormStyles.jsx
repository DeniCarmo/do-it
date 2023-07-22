import styled, { css } from 'styled-components';

const FormModal = css`
  padding: 0;
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  height: auto;
  display: flex;
  place-items: center;
  flex-flow: column;
  padding: 25px 15px 20px 15px;
  ${({ modal }) => modal && FormModal}
`;

export const FormTitle = styled.h1`
  font-size: 28px;
  line-height: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
`;

export const FormInput = styled.input`
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  color: #575757;
  width: 100%;
  height: auto;
  min-height: 35px;
  border: 1px solid #272727;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const FormButton = styled.button`
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #fefefe;
  width: 100%;
  max-width: 150px;
  height: auto;
  min-height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #212529;
`;

export const FormButtons = styled.span`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 0 15px;
`;

export const FormLabel = styled.label`
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
`;
