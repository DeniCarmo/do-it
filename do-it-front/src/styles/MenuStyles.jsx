import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MenuContainer = styled.ul`
  width: 100%:
  height: auto;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 0 15px;
  list-style: none;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  jsutify-center: center;
  text-align: center;
`;

export const MenuLink = styled(Link)`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #575757;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: #272727;
    text-decoration: none;
  }
`;
