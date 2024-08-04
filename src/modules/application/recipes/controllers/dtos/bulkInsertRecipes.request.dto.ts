import Recipe from '../../domain/recipe';

export default class BulkInsertRecipesRequestDto {
  readonly title: string;

  readonly ingredients: string;

  readonly instructions: string;

  static toBulkDomain(
    bulkInsertRequest: BulkInsertRecipesRequestDto[],
  ): Recipe[] {
    return bulkInsertRequest.map((request) => {
      return new Recipe({
        title: request.title,
        ingredients: request.ingredients,
        instructions: request.instructions,
      });
    });
  }
}
