import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import RecipeCard from "../components/RecipeCard";
import FilterBar from "../components/FilterBar";
import styles from "./Home.module.css";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  [key: string]: any;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { i, a, c } = router.query;

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) =>
        setIngredients(res.data.meals.map((m: any) => m.strIngredient))
      );
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) =>
        setCategories(res.data.meals.map((m: any) => m.strCategory))
      );
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => setAreas(res.data.meals.map((m: any) => m.strArea)));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:3001/recipes";
    const params = new URLSearchParams();
    if (i) params.append("i", i.toString());
    if (a) params.append("a", a.toString());
    if (c) params.append("c", c.toString());
    if (params.toString()) url += `?${params.toString()}`;

    axios.get(url).then((res) => {
      const meals = res.data.meals || [];
      setRecipes(meals);
      setSortedRecipes(meals);
      setLoading(false);
    });
  }, [i, a, c]);

  useEffect(() => {
    let sorted = [...recipes];
    if (sort === "name-asc") {
      sorted.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (sort === "name-desc") {
      sorted.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    } else if (sort === "area-asc") {
      sorted.sort((a, b) => a.strArea?.localeCompare(b.strArea || ""));
    } else if (sort === "area-desc") {
      sorted.sort((a, b) => b.strArea?.localeCompare(a.strArea || ""));
    }
    setSortedRecipes(sorted);
  }, [sort, recipes]);

  const getTitle = () => {
    if (i) return `Recipes with Ingredient: ${i}`;
    if (a) return `Recipes from Country: ${a}`;
    if (c) return `Recipes in Category: ${c}`;
    return "All Recipes";
  };

  const clearFilters = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{getTitle()}</h1>

      <FilterBar
        ingredients={ingredients}
        categories={categories}
        areas={areas}
        sort={sort}
        setSort={setSort}
        clearFilters={clearFilters}
      />

      {loading ? (
        <p style={{ textAlign: "center", color: "#6B7280" }}>Loading...</p>
      ) : sortedRecipes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#DC2626" }}>
          No recipes found.
        </p>
      ) : (
        <div className={styles.recipeGrid}>
          {sortedRecipes.map((r) => (
            <RecipeCard key={r.idMeal} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
