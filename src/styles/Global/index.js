import styled from 'styled-components';

export const Sform = styled.form`
  background-color: #ced4da;
  border: 3px solid #001011;
  border-radius: 20px;
  -webkit-box-shadow: -11px 36px 91px -20px rgba(0,0,0,0.53);
  -moz-box-shadow: -11px 36px 91px -20px rgba(0,0,0,0.53);
  box-shadow: -11px 36px 91px -20px rgba(0,0,0,0.53);  
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 30px 0;
  width: 35%;
`;

export const Sinput = styled.input`
  color: black;
  background-color: #d5d9dd;
  height: 40px;
  text-align: center;
  font-weight: 700;
  border: 2px solid #001011;
  border-radius: 20px;
  width: 75%;
  &::placeholder {
    color: #57606f;
  }
`;

export const Sbutton = styled.button`
  margin-top: 50px;
  padding: 12px 30px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background-color: #001011;
  border: 2px solid #001011;
  border-radius: 20px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #8DD070;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    color: #000;
    transform: translateY(-7px);
   
  }
  &:active {
    transform: translateY(-1px);
  }
`;

export const Slabel = styled.label`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  text-align: start;
  width: 100%;
`;
