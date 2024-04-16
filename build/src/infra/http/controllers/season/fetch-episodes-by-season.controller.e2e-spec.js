"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const slug_1 = require("@/core/values-objects/slug");
const supertest_1 = __importDefault(require("supertest"));
const make_anime_1 = require("test/factories/make-anime");
const make_episode_1 = require("test/factories/make-episode");
const make_season_1 = require("test/factories/make-season");
const vitest_1 = require("vitest");
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'
(0, vitest_1.describe)('Create Anime (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('[GET] /seasons/anime/[:animeId]', async () => {
        // const { token } = await createAndAuthenticateUser(app)
        const animePrisma = await (0, make_anime_1.makePrismaAnime)({
            title: 'Jujutsu',
        });
        const seasonPrisma01 = await (0, make_season_1.makePrismaSeason)({
            title: 'Temporada 01',
            animeId: animePrisma.id,
        });
        const seasonPrisma02 = await (0, make_season_1.makePrismaSeason)({
            title: 'Temporada 02',
            animeId: animePrisma.id,
        });
        await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episodio 02',
            slug: slug_1.Slug.createFromText('temporada-01-episode-02'),
            seasonId: seasonPrisma01.id,
        });
        await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episodio 02',
            slug: slug_1.Slug.createFromText('temporada-02-episode-01'),
            seasonId: seasonPrisma02.id,
        });
        const response = await (0, supertest_1.default)(app_1.app.server).get(`/episodes/season/${seasonPrisma02.id}`);
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        (0, vitest_1.expect)(response.body.episodes[0].title).toBe('Episodio 02');
    });
});
