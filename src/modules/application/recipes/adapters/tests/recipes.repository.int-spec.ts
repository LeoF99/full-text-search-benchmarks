import { EntityManager } from 'typeorm';
import RecipesRepository from '../recipes.repository';
import { TestingModule } from '@nestjs/testing';
import databaseIntegrationTestModule from '../../../test/helpers/databaseIntTest.module';
import { RecipeEntity } from '../entities/recipe.entity';
import Recipe from '../../domain/recipe';

describe('RecipesRepository', () => {
  let repository: RecipesRepository;
  let entityManager: EntityManager;
  let module: TestingModule;

  beforeAll(async () => {
    ({ repository, entityManager, module } =
      await databaseIntegrationTestModule(RecipesRepository, RecipeEntity));
  }, 20000);

  beforeEach(async () => {
    await entityManager.clear(RecipeEntity);
  });

  afterAll(async () => {
    await entityManager.clear(RecipeEntity);
    await module.close();
  });

  const recipes: Recipe[] = [
    new Recipe({
      title: 'recipe 1',
      ingredients: 'ingredient 1',
      instructions: 'instruction 1',
    }),
    new Recipe({
      title: 'recipe 2',
      ingredients: 'ingredient 2',
      instructions: 'instruction 2',
    }),
  ];

  it('bulkInsert', async () => {
    await repository.bulkInsert(recipes);

    const insertedRecipes = await entityManager
      .getRepository(RecipeEntity)
      .find();

    expect(insertedRecipes).toHaveLength(2);
    expect(insertedRecipes[0].title).toEqual(recipes[0].title);
    expect(insertedRecipes[1].title).toEqual(recipes[1].title);
    expect(insertedRecipes[0].ingredients).toEqual(recipes[0].ingredients);
    expect(insertedRecipes[1].ingredients).toEqual(recipes[1].ingredients);
    expect(insertedRecipes[0].instructions).toEqual(recipes[0].instructions);
    expect(insertedRecipes[1].instructions).toEqual(recipes[1].instructions);
  });
});
