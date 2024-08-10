/* eslint-disable no-await-in-loop */
import * as child_process from 'child_process';
import { promisify } from 'util';

const exec = promisify(child_process.exec);

const isContainerHealthy = async (containerName: string): Promise<boolean> => {
  const { stdout } = await exec(
    `docker inspect --format "{{.State.Health.Status}}" ${containerName}`,
  );
  return stdout === 'healthy\n';
};

const waitForContainer = async (containerName: string): Promise<void> => {
  let isHealthy: boolean;
  do {
    await promisify(setTimeout)(1000);
    process.stdout.write('.');
    isHealthy = await isContainerHealthy(containerName);
  } while (!isHealthy);
};

const startContainers = async (): Promise<void> => {
  await exec(`docker-compose -f docker-compose.test.yml up -d`);
};

const setupEnvironment = async (): Promise<void> => {
  process.stdout.write('\nSetting up containers for tests.\n');
  await startContainers();
  process.stdout.write('Waiting...');
  await waitForContainer('full-text-search-benchmarks-test-db-1');
  process.stdout.write('Done!\n');
};

const setupDatabase = async (): Promise<void> => {
  process.stdout.write('\nRunning database setup and migrations.\n');
  if (process.env.CI) {
    // eslint-disable-next-line no-template-curly-in-string
    await exec('bash -c "${PACKAGE_MANAGER_RUNNER} db:migration:run"');
  } else {
    await exec('npm run migration:run');
  }
  process.stdout.write('Done!\n');
};

module.exports = async () => {
  if (!process.env.CI) {
    await setupEnvironment();
  }
};
