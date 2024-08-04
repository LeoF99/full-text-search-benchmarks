import {
  Type,
  MiddlewareConsumer,
  NestModule,
  Module,
  Provider,
  INestApplication,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import setupApplication from '../../../../configuration/setupApplication';
import AppLogger from '../../../configuration/logging/app.logger';
import AuthModule from '../../../configuration/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: globalThis.ENV_FILE }),
    AuthModule,
  ],
})
class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {}
}

const controllerIntegrationTestModule = async (
  Controller,
  providers?: Provider[],
  imports: Type<any>[] = [],
): Promise<{
  app: INestApplication;
}> => {
  const module = await Test.createTestingModule({
    imports: [...imports, TestModule],
    controllers: [Controller],
    providers,
  }).compile();

  const app = module.createNestApplication();
  await setupApplication(app);
  await app.init();

  return { app };
};

export default controllerIntegrationTestModule;
