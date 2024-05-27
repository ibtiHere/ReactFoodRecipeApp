import React, { useContext } from "react";
import { GlobalContext } from "../../components/context";
import RecipeItem from "../../components/recipe-item";

const Home = () => {
  const { loading, recipelist } = useContext(GlobalContext);
  if (loading) {
    return <div>loading...!</div>;
  }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipelist && recipelist.length > 0 ? (
        recipelist.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing To Show, Search Something..
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
