import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/recipes').then(res => setRecipes(res.data.meals));
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      <div className="grid grid-cols-3 gap-4">
        {recipes?.map((r: any) => <RecipeCard key={r.idMeal} recipe={r} />)}
      </div>
    </div>
  );
}