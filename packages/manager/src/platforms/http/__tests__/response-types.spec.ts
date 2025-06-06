import request from 'supertest';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { runPlatformTest } from './helpers/platform-test.helper-spec.ts';
import { HttpPlatform } from '../../../types/http-platform.ts';

runPlatformTest('should handle string responses', async (platform: HttpPlatform) => {
  platform.router.get('/test', () => 'Hello World');
  await platform.start(0);
  const server = platform.getServer();

  const response = await request(server)
    .get('/test')
    .expect(200);

  assert.is(response.text, 'Hello World');
});

runPlatformTest('should handle JSON responses', async (platform: HttpPlatform) => {
  platform.router.get('/json', () => ({ message: 'Hello World' }));
  await platform.start(0);
  const server = platform.getServer();

  const response = await request(server)
    .get('/json')
    .expect(200);

  assert.equal(response.body, { message: 'Hello World' });
});

runPlatformTest('should handle null responses', async (platform: HttpPlatform) => {
  platform.router.get('/null', () => null);
  await platform.start(0);
  const server = platform.getServer();

  const response = await request(server)
    .get('/null')
    .expect(200);

  assert.is(response.text, '');
});

runPlatformTest('should handle number responses', async (platform: HttpPlatform) => {
  platform.router.get('/number', () => 42);
  await platform.start(0);
  const server = platform.getServer();

  const response = await request(server)
    .get('/number')
    .expect(200);

  assert.is(response.text, '42');
});

test.run(); 