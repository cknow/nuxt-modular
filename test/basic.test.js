import { Nuxt, Builder } from 'nuxt-edge';
import request from 'request-promise-native';
import config from './fixtures/basic/nuxt.config';

const url = path => `http://localhost:3000${path}`;
const get = path => request(url(path));

describe('basic', () => {
    let nuxt;

    beforeAll(async () => {
        nuxt = new Nuxt(config);
        await new Builder(nuxt).build();
        await nuxt.listen(3000);
    }, 60000);

    afterAll(async () => {
        await nuxt.close();
    });

    test('/', async () => {
        const html = await get('/');

        expect(html).toContain('index');
    });

    test('/example', async () => {
        const html = await get('/example');

        expect(html).toContain('example');
    });
});

describe('ignore pages files or folders with @ prefix', () => {
    let nuxt;

    beforeAll(async () => {
        nuxt = new Nuxt(config);
        await new Builder(nuxt).build();
        await nuxt.listen(3000);
    }, 60000);

    afterAll(async () => {
        await nuxt.close();
    });

    test('/example/@components/HomeBanner', async () => {
        try {
            await get('/example/@components/HomeBanner');
        } catch (error) {
            expect(error.statusCode).toStrictEqual(404);
        }
    });

    test('/example/@home-banner', async () => {
        try {
            await get('/example/@components/HomeBanner');
        } catch (error) {
            expect(error.statusCode).toStrictEqual(404);
        }
    });
});
