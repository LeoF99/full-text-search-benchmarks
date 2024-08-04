import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from '../../../configuration/database/repository/base.reposytory';
import Recipe from '../domain/recipe';
import { RecipeEntity } from './entities/recipe.entity';
import { Repository } from 'typeorm';

export default class RecipesRepository extends BaseRepository<RecipeEntity> {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {
    super(recipeRepository);
  }

  async bulkInsert(recipes: Recipe[]): Promise<void> {
    const entities = recipes.map((recipe) => RecipeEntity.fromDomain(recipe));

    await super.bulkInsert(entities);
  }
}
