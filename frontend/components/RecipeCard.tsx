import Link from "next/link";
import styles from "../pages/Home.module.css";

export default function RecipeCard({ recipe }: any) {
  return (
    <div className={styles.card}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className={styles.cardImage}
      />
      <Link href={`/recipe/${recipe.idMeal}`} className={styles.cardTitle}>
        {recipe.strMeal}
      </Link>
    </div>
  );
}
