import { UnprocessableEntityException } from '@nestjs/common';

export enum BusinessError {
  INVALID_DISCOUNT = 'INVALID_DISCOUNT',
}

export default class BusinessException extends UnprocessableEntityException {
  constructor(message: string, code?: BusinessError | string) {
    super(message, code && code.toString());
  }
}
