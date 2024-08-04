import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import LoggingInterceptor from '../interceptors/logging.interceptor';
import { ConfigurationModules } from './configuration';

@Module({
  imports: [...ConfigurationModules],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {}
}
