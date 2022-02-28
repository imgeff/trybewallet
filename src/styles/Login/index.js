import styled from 'styled-components';

const SbuttonAddExpense = styled.button`
margin-top: 50px;
padding: 12px 30px;
font-size: 15px;
font-weight: 700;
color: #fff;
border: 2px solid #000000;
background-color: #000000;
border-radius: 20px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease 0s;
cursor: pointer;
outline: none;
&:hover {
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  color: #8DD070;
  transform: translateY(-7px);
 
}
&:active {
  transform: translateY(-1px);
}
`;

const StextLabel = styled.span`
  color: #001011;
  font-weight: 700;
  margin-bottom: 5px;
`;

const SboxButtons = styled.div`
  margin-top: 50px;
`;

export {
  StextLabel,
  SbuttonAddExpense,
  SboxButtons,
};
