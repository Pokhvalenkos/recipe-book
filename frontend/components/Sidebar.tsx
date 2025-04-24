import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./Sidebar.module.css";

export default function Sidebar({ category }: { category: string }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:3001/recipes?c=${category}`)
        .then((res) => setRecipes(res.data.meals || []));
    }
  }, [category]);

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>More in {category}</h3>
      <ul className={styles.list}>
        {recipes.map((r: any) => (
          <li key={r.idMeal}>
            <Link href={`/recipe/${r.idMeal}`} className={styles.link}>
              {r.strMeal}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
