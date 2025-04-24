import Link from "next/link";
import styles from "./RecipeInfo.module.css";

export default function RecipeInfo({ recipe }: any) {
  const ingredients: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name, measure });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{recipe.strMeal}</h1>
        <p className={styles.country}>
          Country:{" "}
          <Link
            href={`/?a=${recipe.strArea}`}
            className="text-blue-600 underline"
          >
            {recipe.strArea}
          </Link>
        </p>

        <p className={styles.instructions}>{recipe.strInstructions}</p>

        <h2 className={styles.sectionTitle}>Ingredients</h2>
        <ul className={styles.ingredientList}>
          {ingredients.map((ing, idx) => (
            <li key={idx}>
              <Link href={`/?i=${ing.name}`} className={styles.ingredientLink}>
                {ing.name}
              </Link>{" "}
              - {ing.measure}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
