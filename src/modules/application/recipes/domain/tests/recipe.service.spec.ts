import RecipesRepository from '../../adapters/recipes.repository';
import Recipe from '../recipe';
import RecipeService from '../recipe.service';

describe('RecipeService', () => {
  let recipesRepository: RecipesRepository;
  let recipeService: RecipeService;

  beforeEach(() => {
    recipesRepository = new RecipesRepository(null);
    recipeService = new RecipeService(recipesRepository);
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

  describe('bulkInsert', () => {
    it('should call repository to bulk insert recipes', async () => {
      recipesRepository.bulkInsert = jest.fn();

      await recipeService.bulkInsert(recipes);

      expect(recipesRepository.bulkInsert).toHaveBeenCalledWith(recipes);
    });

    it('should throw error if repository throws error', async () => {
      const error = new Error('error');

      recipesRepository.bulkInsert = jest.fn().mockRejectedValue(error);

      await expect(recipeService.bulkInsert(recipes)).rejects.toThrow(error);
    });
  });
});
