import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './adapters/entities/recipe.entity';
import RecipesController from './controllers/recipes.controller';
import RecipesRepository from './adapters/recipes.repository';
import RecipeService from './domain/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  controllers: [RecipesController],
  providers: [RecipesRepository, RecipeService],
})
export default class RecipesModule {}
