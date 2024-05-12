"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const supertest_1 = __importDefault(require("supertest"));
const make_anime_1 = require("test/factories/make-anime");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Anime To Watchlist (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('should be to able add anime on watchlist', async () => {
        await (0, supertest_1.default)(app_1.app.server).post('/users').send({
            name: 'Luis Felipe',
            email: 'luiss@gmail.com',
            password: '123456',
        });
        const sessionsResponse = await (0, supertest_1.default)(app_1.app.server).post('/sessions').send({
            email: 'luiss@gmail.com',
            password: '123456',
        });
        const { token } = sessionsResponse.body;
        const anime01 = await (0, make_anime_1.makePrismaAnime)();
        const anime02 = await (0, make_anime_1.makePrismaAnime)();
        const response = await (0, supertest_1.default)(app_1.app.server)
            .post('/watchlist')
            .set('Authorization', `Bearer ${token}`)
            .send({
            animes: [anime01.id.toString(), anime02.id.toString()],
        });
        console.log(response);
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        // expect(response.body).toEqual({
        //   token: expect.any(String),
        // })
    });
});
