import styled from 'styled-components';

export const BlockСontrol = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0 10px;
  max-width: 730px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BlockSort = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: none;
`;
