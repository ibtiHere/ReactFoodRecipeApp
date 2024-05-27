import RecipeItem from "../../components/recipe-item";
import { useContext } from "react";
import { GlobalContext } from "../../components/context";
const Favroties = () => {
  const { favList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favList && favList.length > 0 ? (
        favList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing Is Added In Favoraites.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favroties;
