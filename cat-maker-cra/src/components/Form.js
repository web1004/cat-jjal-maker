import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 20%;
  height: 35px;
  background: #f9f9f9;
	border: 1px solid #ddd;
  text-indent: 6px;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
  transition: 0.35s;
  &:hover{
    border: 1px solid skyblue;
    box-shadow: 0 0 5px skyblue;
  }
`;

const ButtonStyle = styled.button`
  margin: 0 3px;
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
  border:none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  width: 60px;
  height: 40px;

`;

const Form = ({updateMainCat, removeCat}) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");


  function handleInputChange(e){
    const userValue = e.target.value;
    setErrorMessage("");

    if(includesHangul(userValue)){
      setErrorMessage("한글은 입력할 수 없습니다.");
    }

    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e){
    e.preventDefault();
    setErrorMessage("");

    if(value ===""){
      setErrorMessage("빈 값으로 만들 수 없습니다.");
      return;
    }

    updateMainCat(value); 
  }

  return(
    <form>
      <InputStyle 
      type="text" 
      name="name" 
      placeholder="영어 대사를 입력해주세요" 
      value={value}
      onChange={handleInputChange}
      />
      <ButtonStyle type="submit" onClick={handleFormSubmit}>생성</ButtonStyle>
      <ButtonStyle type="text" onClick={removeCat}>초기화</ButtonStyle>
      <p style={{color:"crimson"}}>{errorMessage}</p>
    </form>
  );
};

export default Form;