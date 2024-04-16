"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const supertest_1 = __importDefault(require("supertest"));
const make_anime_1 = require("test/factories/make-anime");
const make_genre_1 = require("test/factories/make-genre");
const vitest_1 = require("vitest");
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'
(0, vitest_1.describe)('Create Anime (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('[GET] /animes/genre/[:slug]', async () => {
        // const { token } = await createAndAuthenticateUser(app)
        const animePrisma = await (0, make_anime_1.makePrismaAnime)({
            title: 'Jujutsu',
        });
        await (0, make_genre_1.makePrismaGenre)({
            animeId: animePrisma.id,
            title: 'Ação',
        });
        const response = await (0, supertest_1.default)(app_1.app.server).get('/animes/genre/acao');
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        (0, vitest_1.expect)(response.body.animes[0].title).toBe('Jujutsu');
    });
});
