import React from "react";
import './App.css';
import Title from "./components/Title";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";
import Form from "./components/Form";

// localStorage
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  removeItem: (key) => {  //추가
    localStorage.removeItem(key);
  }
};

// API fetch
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


// ================= App =================
const App =() => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  const [counter, setCounter]  = React.useState(() => {
    return jsonLocalStorage.getItem("counter")
  });

  const [mainCat, setMainCat] = React.useState(CAT1);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat); 

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  };

  React.useEffect(() => {
    setInitialCat();
  }, []);    

  async function updateMainCat(value){
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {         
      const nextCounter = prev +1;
      jsonLocalStorage.setItem("counter", nextCounter); 
      return nextCounter;
    });
  } 

  function favoritesSetting(){  /* favorites 리스트에 추가하는 함수 */
    const nextFavorites = [...favorites,mainCat];
    jsonLocalStorage.setItem("favorites", nextFavorites);
    setFavorites(nextFavorites);
  }

  function handleHeartClick(){ /* 하트 버튼을 클릭하면 리스트에 새로운 고양이를 추가함 */
    const existingCat = jsonLocalStorage.getItem("favorites");

    if ( localStorage.getItem("favorites") != null ){
      const found = existingCat.findIndex((a,i) => {
        return mainCat == existingCat[i];
      });

      found >= 0 ? alert("중복된 고양이입니다!") : favoritesSetting();

    } else {
      favoritesSetting();
    }
  }

  /* function handleHeartClick(){
    const nextFavorites = [...favorites,mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }; */


  const counterTitle = counter === null ? "" : counter + "번째 ";

  function removeCat(){ /* localStorage 초기화 함수 */
    jsonLocalStorage.removeItem("favorites");
    jsonLocalStorage.removeItem("counter");
  }

  return(
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <img className="title-img" src={process.env.PUBLIC_URL + `/img/cat-title.png`} />
      <Form updateMainCat={updateMainCat} removeCat={removeCat}/>
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite}/>
      <Favorites favorites={favorites}/>
    </div>
  );
};


export default App;