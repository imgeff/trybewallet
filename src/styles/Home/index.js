import styled from 'styled-components';

export const Shome = styled.div`
  align-items: center;
  background: rgb(253,254,254);
  background: radial-gradient(circle, rgba(253,254,254,1) 0%, rgba(182,188,194,1) 100%);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 880px;
`;

export const Simg = styled.img`
  width: 600px;
  aspect-ratio: 1 / 1;
`;

export const Stext = styled.b`
  font-size: 30px;
`;

export const Slink = styled.button`
  cursor: pointer;
  text-decoration: none;
  padding: 15px 25px;
  border: 2px solid #000;
  border-radius: 15px;
  color: #e8e8e8;
  z-index: 1;
  background-color: black;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 350ms;
  overflow: hidden;
  &::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #8DD070;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px #8DD070;
  box-shadow: 4px 8px 19px -3px #8DD070;
  transition: all 350ms
  }
  &:hover {
  color: black;
  border: 2px solid black;
  }
  &:hover::before {
  width: 100%;
  }
`;
