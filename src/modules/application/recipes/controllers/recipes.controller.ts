import { Body, Controller, Post } from '@nestjs/common';
import RecipeService from '../domain/recipe.service';
import BulkInsertRecipesRequestDto, {
  BulkInsertRecipesRequestItem,
} from './dtos/bulkInsertRecipes.request.dto';

@Controller('recipes')
export default class RecipesController {
  constructor(private readonly recipesService: RecipeService) {}

  @Post()
  async bulkInsert(
    @Body() bulkInsertRecipesRequest: BulkInsertRecipesRequestDto,
  ): Promise<void> {
    const recipes = BulkInsertRecipesRequestItem.toBulkDomain(
      bulkInsertRecipesRequest,
    );

    await this.recipesService.bulkInsert(recipes);

    return;
  }
}
