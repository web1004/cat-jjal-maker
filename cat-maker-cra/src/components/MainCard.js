import styled from "styled-components";

const Img = styled.img`
  height: 400px;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 3px 8px;
  transform: translateX(20px);
`;

const Button = styled.button`
  cursor: pointer;
  width: 60px;
  border: none;
  outline: none;
  color: white;
  background: none;
  font-size:40px;
`;

const MainCard = ({img,onHeartClick,alreadyFavorite}) => {
  const heartIcon = alreadyFavorite ? "💖" : "❤️" ;

  return(
    <div className="main-card">
      <Img
        src={img}
        alt="고양이"
        width="400"
      />
      <Button onClick={onHeartClick}>{heartIcon}</Button>
    </div>
  );
};

export default MainCard;