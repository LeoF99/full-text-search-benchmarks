import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import Recipe from '../../domain/recipe';

export class BulkInsertRecipesRequestItem {
  @IsString()
  readonly title: string;

  @IsString()
  readonly ingredients: string;

  @IsString()
  readonly instructions: string;

  static toBulkDomain(
    bulkInsertRequest: BulkInsertRecipesRequestDto,
  ): Recipe[] {
    return bulkInsertRequest.recipes.map((request) => {
      return new Recipe({
        title: request.title,
        ingredients: request.ingredients,
        instructions: request.instructions,
      });
    });
  }
}

export default class BulkInsertRecipesRequestDto {
  @ValidateNested({ each: true })
  @ArrayMaxSize(50)
  @ArrayMinSize(1)
  @IsArray()
  readonly recipes: BulkInsertRecipesRequestItem[];
}
