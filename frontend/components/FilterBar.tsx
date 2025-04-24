import { useRouter } from "next/router";
import styles from './FilterBar.module.css';

export default function FilterBar({
  ingredients,
  categories,
  areas,
  sort,
  setSort,
  clearFilters
}: {
  ingredients: string[];
  categories: string[];
  areas: string[];
  sort: string;
  setSort: (s: string) => void;
  clearFilters: () => void;
}) {
  const router = useRouter();
  const { i, a, c } = router.query;

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Filter by Ingredient</label>
        <select
          className={styles.select}
          value={i || ""}
          onChange={(e) =>
            router.push({
              pathname: "/",
              query: { ...router.query, i: e.target.value },
            })
          }
        >
          <option value="">All</option>
          {ingredients.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Filter by Category</label>
        <select
          className={styles.select}
          value={c || ""}
          onChange={(e) =>
            router.push({
              pathname: "/",
              query: { ...router.query, c: e.target.value },
            })
          }
        >
          <option value="">All</option>
          {categories.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Filter by Country</label>
        <select
          className={styles.select}
          value={a || ""}
          onChange={(e) =>
            router.push({
              pathname: "/",
              query: { ...router.query, a: e.target.value },
            })
          }
        >
          <option value="">All</option>
          {areas.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Sort Recipes</label>
        <select
          className={styles.select}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">None</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="area-asc">Country A–Z</option>
          <option value="area-desc">Country Z–A</option>
        </select>
      </div>

      {(i || a || c) && (
        <button onClick={clearFilters} className={styles.clearBtn}>
          Clear Filters
        </button>
      )}
    </div>
  );
}