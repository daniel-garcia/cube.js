/* globals describe, afterAll, beforeAll, test, expect, jest, it */
const { GenericContainer, Wait } = require('testcontainers');
const PromqlDriver = require('../driver/PromqlDriver');

describe('PromqlDriver Prometheus', () => {
  let container;
  let elasticSearchDriver;

  jest.setTimeout(60 * 2 * 1000);

  const version = process.env.TEST_PROMETHEUS_VERSION || '2.32.1';

  const startContainer = () => new GenericContainer(`prom/prometheus:${version}`)
    .withExposedPorts(9090)
    .withHealthCheck({
      test: 'curl -k --silent --fail https://localhost:9090/ || exit 1',
      interval: 3 * 1000,
      startPeriod: 15 * 1000,
      timeout: 500,
      retries: 30
    })
    .withWaitStrategy(Wait.forHealthCheck())
    .start();

  const createDriver = (c) => {
    const port = c && c.getMappedPort(9090) || 9090;

    return new PromqlDriver({
      url: `https://localhost:${port}`
    });
  };

  beforeAll(async () => {
    container = await startContainer();
    promqlDriver = createDriver(container);
    promqlDriver.setLogger((msg, event) => console.log(`${msg}: ${JSON.stringify(event)}`));
  });

  it('testConnection', async () => {
    await elasticSearchDriver.testConnection();
  });


  afterAll(async () => {
    await elasticSearchDriver.release();

    if (container) {
      console.log('[container] Stopping');

      await container.stop();

      console.log('[container] Stopped');
    }
  });
});
