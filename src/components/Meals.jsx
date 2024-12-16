import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
    // {} is recreated everytime Meals function runs -> infinite loop
    // } = useHttp("http://localhost:3000/meals", {}, []);
  } = useHttp(`${import.meta.env.VITE_BACKEND_URL}/meals`, requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {console.log(import.meta.env.VITE_BACKEND_URL)}
      {console.log(`Meals.jsx loadedMeals: ${loadedMeals}`)}
      {console.log(`Meals.jsx error: ${error}`)}
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} id={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
