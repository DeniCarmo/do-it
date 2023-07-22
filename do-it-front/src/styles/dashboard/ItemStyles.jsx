import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;
  min-height: 350px;
  display: flex;
  flex-flow: column;
  background-color: #ffff88;
  padding: 15px 10px;
  box-shadow: 4px 4px 6px #cecece;
  border-radius: 15px;
`;

export const ItemHeader = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  color: #575757;
  width: 100%;
  height: auto;
  min-height: 30px;
  text-align: left;
  border-bottom: 2px solid #272727;
  margin-bottom: 10px;
`;

export const ItemContent = styled.div`
  width: 100%;
  height: auto;
`;

export const ItemDesc = styled.div`
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: #272727;
  width: 100%;
  height: auto;
`;

export const ItemFooter = styled.span`
  width: 100%;
  height: auto;
  min-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 0 20px;
  margin-top: auto;
`;

export const ItemButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
