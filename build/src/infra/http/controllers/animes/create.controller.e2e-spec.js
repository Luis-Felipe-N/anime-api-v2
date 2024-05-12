"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const prisma_1 = require("@/infra/database/prisma/prisma");
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'
(0, vitest_1.describe)('Create Anime (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('[POST] /animes', async () => {
        // const { token } = await createAndAuthenticateUser(app)
        const response = await (0, supertest_1.default)(app_1.app.server).post('/animes').send({
            slug: 'castlevania',
        });
        (0, vitest_1.expect)(response.statusCode).toEqual(201);
        const animeOnDatabase = await prisma_1.prisma.anime.findFirst({
            where: {
                slug: 'castlevania',
            },
        });
        const seasonOnDatabase = await prisma_1.prisma.season.findFirst({
            where: {
                anime: {
                    slug: 'castlevania',
                },
            },
        });
        const episodesOnDatabase = await prisma_1.prisma.episode.findMany({
            where: {
                seasonId: seasonOnDatabase?.id,
            },
        });
        (0, vitest_1.expect)(animeOnDatabase).toBeTruthy();
        (0, vitest_1.expect)(seasonOnDatabase).toBeTruthy();
        (0, vitest_1.expect)(episodesOnDatabase.length).toBeGreaterThan(0);
    });
});
