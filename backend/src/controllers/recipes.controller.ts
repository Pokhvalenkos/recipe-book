import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from '../services/recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(@Query() query: { i?: string; a?: string; c?: string }) {
    return this.recipesService.fetchRecipes(query);
  }

  @Get('info')
  async getRecipeInfo(@Query('id') id: string) {
    return this.recipesService.fetchRecipeInfo(id);
  }
}