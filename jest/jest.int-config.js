/* eslint-disable @typescript-eslint/no-var-requires */
const defaultConfig = require('./jest.config');

module.exports = {
  ...defaultConfig,
  testRegex: '.*\\.int-spec\\.ts$',
  coverageDirectory: '../coverage/int',
  globalSetup: '../jest/setup.ts',
  globalTeardown: '../jest/teardown.ts',
};
