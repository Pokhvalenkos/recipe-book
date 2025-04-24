import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecipesService {
  private readonly BASE_URL = process.env.RECIPE_API_BASE;

  async fetchRecipes(query: any) {
    let url = `${this.BASE_URL}/search.php?s=`;
    if (query.i) url = `${this.BASE_URL}/filter.php?i=${query.i}`;
    else if (query.a) url = `${this.BASE_URL}/filter.php?a=${query.a}`;
    else if (query.c) url = `${this.BASE_URL}/filter.php?c=${query.c}`;
    return (await axios.get(url)).data;
  }

  async fetchRecipeInfo(id: string) {
    return (await axios.get(`${this.BASE_URL}/lookup.php?i=${id}`)).data;
  }
}