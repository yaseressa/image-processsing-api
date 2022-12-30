import supertest from 'supertest';
import app from '../src/index';

const tester = supertest(app);

describe('Testing connectivity of the endpoints', (): void => {
  it('GET /', async (): Promise<void> => {
    const res: supertest.Response = await tester.get('/');
    expect(res.status).toBe(200);
  });

  it('GET /IApi/image?name=fjord <no queries>', async (): Promise<void> => {
    const res: supertest.Response = await tester.get('/IApi/image?name=fjord');

    expect(res.status).toBe(200);
  });
  it('GET /IApi/image?name=fjord&w=300&h=300 <with queries>', async (): Promise<void> => {
    const res: supertest.Response = await tester.get(
      '/IApi/image?name=fjord&w=300&h=300'
    );

    expect(res.status).toBe(200);
  });
});
