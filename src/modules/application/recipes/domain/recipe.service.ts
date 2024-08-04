import { Injectable } from '@nestjs/common';
import RecipesRepository from '../adapters/recipes.repository';
import Recipe from './recipe';

@Injectable()
export default class RecipeService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async bulkInsert(recipes: Recipe[]): Promise<void> {
    await this.recipesRepository.bulkInsert(recipes);
  }
}
