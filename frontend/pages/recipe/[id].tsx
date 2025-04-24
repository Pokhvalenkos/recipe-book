import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeInfo from "../../components/RecipeInfo";
import Sidebar from "../../components/Sidebar";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  [key: string]: any;
};

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/recipes/info?id=${id}`).then((res) => {
        setRecipe(res.data.meals?.[0]);
      });
    }
  }, [id]);

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <RecipeInfo recipe={recipe} />
      </div>
      <Sidebar category={recipe.strCategory} />
    </div>
  );
}
