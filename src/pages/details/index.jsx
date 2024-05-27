import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../components/context";

const Details = () => {
  const { id } = useParams();
  const { recipeDetails, setRrecipeDetails, HandleAddToFav, favList } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();

        console.log(data);
        if (data?.data) {
          setRrecipeDetails(data?.data);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    }

    getRecipeDetails();
  }, [id, setRrecipeDetails]); // Make sure to include dependencies

  console.log(recipeDetails, "recipeDetails");

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetails?.recipe?.image_url}
            alt=""
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetails?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetails?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => HandleAddToFav(recipeDetails?.recipe)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {favList &&
            favList.length &&
            favList.findIndex(
              (item) => item.id === recipeDetails?.recipe?.id
            ) !== -1
              ? "remove from favoraites"
              : "add to favoraites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            ingrediants :
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetails?.recipe?.ingredients.map((ingredient) => (
              <li>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit}{" "}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
