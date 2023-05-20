import styled from 'styled-components';

export const ListContainer = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListBody = styled.div`
  width: 100%;
  max-width: 450px;
  height: auto;
  min-height: 350px;
  display: flex;
  flex-flow: column;
  background-color: #ffff88;
  padding: 15px 10px;
  box-shadow: 4px 4px 6px #cecece;
  border-radius: 15px;
`;

export const ListTitle = styled.h1`
  font-size: 28px;
  line-height: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #272727;
  padding-bottom: 5px;
`;

export const ListContent = styled.ul`
  width: 100%;
  height: auto;
`;
