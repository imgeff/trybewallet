import styled from 'styled-components';

const Shome = styled.div`
  align-items: center;
  background: rgb(253,254,254);
  background: radial-gradient(circle, rgba(253,254,254,1) 0%, rgba(182,188,194,1) 100%);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 880px;
`;

const Simg = styled.img`
  width: 600px;
  aspect-ratio: 1 / 1;
`;

const Stext = styled.b`
  font-size: 30px;
`;

const Slink = styled.a`
  margin-top: 50px;
  text-decoration: none;
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #e8e8e8;
  z-index: 1;
  background-color: black;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 250ms;
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
  transition: all 250ms
  }
  &:hover {
  color: black;
  border: 2px solid black;
  }
  &:hover::before {
  width: 100%;
  }
`;

const Sform = styled.form`
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
  height: 400px;
  width: 35%;
`;

const Sinput = styled.input`
  color: black;
  background-color: #d5d9dd;
  height: 40px;
  text-align: center;
  font-weight: 700;
  border: 2px solid #001011;
  border-radius: 20px;
  width: 75%;
  &::placeholder {
    color: #001011;
  }
`;

const Sbutton = styled.button`
  margin-top: 50px;
  padding: 12px 30px;
  font-size: 15px;
  font-weight: 700;
  color: #000;
  background-color: #d5d9dd;
  border: 2px solid #001011;
  border-radius: 20px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #001011;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    color: #fff;
    transform: translateY(-7px);
   
  }
  &:active {
    transform: translateY(-1px);
  }
`;

const Slabel = styled.label`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  text-align: start;
  width: 100%;
`;

const StextLabel = styled.span`
  color: #001011;
  font-weight: 700;
  margin-bottom: 5px;
`;

export {
  Shome,
  Simg,
  Stext,
  Slink,
  Sform,
  Slabel,
  StextLabel,
  Sinput,
  Sbutton,
};
