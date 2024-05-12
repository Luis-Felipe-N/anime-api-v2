"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const supertest_1 = __importDefault(require("supertest"));
const make_anime_1 = require("test/factories/make-anime");
const make_episode_1 = require("test/factories/make-episode");
const make_season_1 = require("test/factories/make-season");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Comment On Episode (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('[POST] /episodes/[:episodeId]/comments', async () => {
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
        const anime = await (0, make_anime_1.makePrismaAnime)({
            title: 'Jujutsu',
        });
        const season = await (0, make_season_1.makePrismaSeason)({
            title: 'Temporada 01',
            animeId: anime.id,
        });
        const episode = await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episode 01',
            seasonId: season.id,
            index: 1,
        });
        const response = await (0, supertest_1.default)(app_1.app.server)
            .post(`/episodes/${episode.id}/comments`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            content: 'Conteúdo do comentário',
        });
        console.log(response);
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        (0, vitest_1.expect)(response.body.comment.content).toBe('Conteúdo do comentário');
    });
});
