"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const supertest_1 = __importDefault(require("supertest"));
const make_anime_1 = require("test/factories/make-anime");
const vitest_1 = require("vitest");
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'
(0, vitest_1.describe)('Create Anime (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    test('[GET] /animes/ with paginator', async () => {
        // const { token } = await createAndAuthenticateUser(app)
        for (let index = 1; index <= 20; index++) {
            await (0, make_anime_1.makePrismaAnime)({
                title: `Anime ação ${index}`,
            });
        }
        await (0, make_anime_1.makePrismaAnime)({
            title: `Anime ação 21`,
        });
        const response = await (0, supertest_1.default)(app_1.app.server).get('/animes').query({
            keyword: 'acão',
            page: 2,
        });
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        (0, vitest_1.expect)(response.body.animes[0].title).toBe('Anime ação 21');
    });
    test('[GET] /animes/', async () => {
        // const { token } = await createAndAuthenticateUser(app)
        await (0, make_anime_1.makePrismaAnime)({
            title: 'Anime de ação',
        });
        const response = await (0, supertest_1.default)(app_1.app.server).get('/animes').query({
            keyword: 'acão',
        });
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        (0, vitest_1.expect)(response.body.animes[0].title).toBe('Anime ação 1');
    });
});
