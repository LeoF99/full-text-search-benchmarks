import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Recipe from '../../domain/recipe';

@Entity('recipes')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  ingredients: string;

  @Column()
  instructions: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(args: {
    id?: string;
    title: string;
    ingredients: string;
    instructions: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    Object.assign(this, args);
  }

  static fromDomain(recipe: Recipe): RecipeEntity {
    return new RecipeEntity({
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    });
  }
}
