import { createContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipelist, setRecipeList] = useState([]);
  const [recipeDetails, setRrecipeDetails] = useState(null);
  const [favList, setFavList] = useState([]);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();

      console.log(data);

      if (data?.data?.recipes) {
        setLoading(false);
        setRecipeList(data?.data?.recipes);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  };

  const HandleAddToFav = (getCurrentItem) => {
    console.log(getCurrentItem);
    let cpyfav = [...favList];
    const index = cpyfav.findIndex((item) => item.id === getCurrentItem.id);
    if (index === -1) {
      cpyfav.push(getCurrentItem);
    } else {
      cpyfav.splice(index);
    }
    setFavList(cpyfav);
  };
  console.log(favList, "favlist");
  return (
    <GlobalContext.Provider
      value={{
        loading,
        recipelist,
        searchParam,
        setSearchParam,
        handleSubmit,
        setRrecipeDetails,
        recipeDetails,
        HandleAddToFav,
        favList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
