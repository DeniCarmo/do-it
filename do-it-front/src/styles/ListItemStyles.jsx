import styled from 'styled-components';

export const ListItemContainer = styled.li`
  width: 100%;
  height: auto;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const ListItemTitle = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: #575757;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const ListItemButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 0 10px;
`;

export const ListItemButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
`;

export const ListItemInput = styled.input`
  width: 100%;
  height: auto;
  background: transparent;
  border: none;
  border-bottom: 1px solid #575757;

  &:active,
  &:focus {
    border-bottom: 1px solid #575757;
    outline: none;
  }
`;
