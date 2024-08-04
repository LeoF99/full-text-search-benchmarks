export default class Recipe {
  readonly id?: string;

  readonly title: string;

  readonly ingredients: string;

  readonly instructions: string;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

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
}
