import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Popular() {

//the variable popular should be set using setPopular() function as soon as the state changes
const [popular, setPopular] = useState([]);

//runs the function as soon as the component gets mounted
  useEffect(() => {
    getPopular();
  }, []);

  //async to fetch the data properly before rendering it
    const getPopular = async () => {

  //checks if some data is stored in the localStorage which stores in string format 
      const check = localStorage.getItem('popular');

  //if the popular item is present it is converted to json otherwise fetched, stored in localStorage by converting to string and stored in setPopular()  

      if(check){
        setPopular(JSON.parse(check));
      }else{
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        //query added to get 9 recipes & format followed to hide api_keys
        const data = await api.json();       

        localStorage.setItem("popular", JSON.stringify(data.recipes));
      
      setPopular(data.recipes);
      }

    };

    return ( 
    <div>
 <Wrapper>
    <h3>Popular Picks</h3>
    <Splide 
    options={{ 
      perPage : 4,
    
      pagination : false,
      drag: "free",
      gap : "3rem",
    }}
    >
    {popular.map((recipe) => {
      return(
 <SplideSlide key={recipe.id}>
<Card>
  <Link to={"/recipe/"+recipe.id} >
<p>{recipe.title}</p>
  <img src={recipe.image} alt={recipe.title} />
  <Gradient />
  </Link>
</Card>
</SplideSlide>
  );
  })}
  </Splide>
    </Wrapper>
    </div>
);
}

const Wrapper = styled.div`
margin: 4rem 2rem;
`;

const Card = styled.div`
min-height: 16rem;
border-radius: 2rem;
overflow: hidden;
position: relative;


img{
  border-radius: 2rem;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
}
p{
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;



export default Popular;