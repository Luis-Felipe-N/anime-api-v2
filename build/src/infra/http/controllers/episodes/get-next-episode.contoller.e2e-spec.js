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
(0, vitest_1.describe)('Get Next Episode (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('[POST] /episodes/next', async () => {
        const animePrisma = await (0, make_anime_1.makePrismaAnime)({
            title: 'Jujutsu',
        });
        const seasonPrisma01 = await (0, make_season_1.makePrismaSeason)({
            title: 'Temporada 01',
            animeId: animePrisma.id,
        });
        await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episode 01',
            seasonId: seasonPrisma01.id,
            index: 1,
        });
        const episodePrisma02 = await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episode 02',
            seasonId: seasonPrisma01.id,
            index: 2,
        });
        const seasonPrisma02 = await (0, make_season_1.makePrismaSeason)({
            title: 'Temporada 02',
            animeId: animePrisma.id,
        });
        await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episode 01',
            seasonId: seasonPrisma02.id,
            slug: slug_1.Slug.createFromText('temporada-02-episode-01'),
            index: 1,
        });
        await (0, make_episode_1.makePrismaEpisode)({
            title: 'Episode 02',
            seasonId: seasonPrisma02.id,
            slug: slug_1.Slug.createFromText('temporada-02-episode-02'),
            index: 2,
        });
        const response = await (0, supertest_1.default)(app_1.app.server).post(`/episodes/next`).send({
            seasonId: seasonPrisma01.id.toString(),
            animeId: animePrisma.id.toString(),
            currentIndex: episodePrisma02.index,
        });
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        (0, vitest_1.expect)(response.body.episode.seasonId).toBe(seasonPrisma02.id.toString());
        (0, vitest_1.expect)(response.body.episode.title).toBe('Episode 01');
    });
});
