import { TypeORMError } from 'typeorm';

export default class InsertException extends TypeORMError {
  constructor() {
    super();

    this.message = `
      Insert Exception for given payload
    `;
  }
}
