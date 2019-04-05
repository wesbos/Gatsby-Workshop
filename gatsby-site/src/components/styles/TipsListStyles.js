import styled from 'styled-components';

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  li {
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    border:1px solid rgba(0,0,0,0.04);
    border-radius: 10px;
    padding: 20px;
  }
  a {
    font-size: 40px;
    font-weight: 900;
  }
`;

export default TipsList;
