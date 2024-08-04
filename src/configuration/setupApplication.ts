import { INestApplication, ValidationPipe } from '@nestjs/common';
import AppLogger from '../modules/configuration/logging/app.logger';

const setupApplication = async (app: INestApplication): Promise<void> => {
  app.enableShutdownHooks();
  app.useLogger(app.get(AppLogger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
};

export default setupApplication;
