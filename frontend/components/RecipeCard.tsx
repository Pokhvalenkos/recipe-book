import Link from 'next/link';

export default function RecipeCard({ recipe }: any) {
  return (
    <Link href={`/recipe/${recipe.idMeal}`}>
      <div className="border p-4 shadow-md hover:bg-gray-100">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-bold mt-2">{recipe.strMeal}</h2>
      </div>
    </Link>
  );
}