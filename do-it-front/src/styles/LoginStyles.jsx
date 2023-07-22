import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LoginContainer = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

export const LoginTitle = styled.h1`
  font-size: 28px;
  line-height: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
`;

export const FormText = styled.p`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #212529;
  text-align: center;
  margin: 15px 0;
`;

export const FormLink = styled(Link)`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #212529;
  text-decoration: underline;
`;
