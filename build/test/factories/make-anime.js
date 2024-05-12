"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrismaAnime = exports.makeAnime = void 0;
const anime_1 = require("@/domain/enterprise/entities/anime");
const prisma_anime_mapper_1 = require("@/infra/database/mapper/prisma-anime-mapper");
const prisma_1 = require("@/infra/database/prisma/prisma");
const faker_1 = require("@faker-js/faker");
function makeAnime(override = {}, id) {
    const anime = anime_1.Anime.create({
        title: faker_1.faker.lorem.sentence(),
        description: faker_1.faker.lorem.text(),
        banner: faker_1.faker.image.url(),
        cover: faker_1.faker.image.url(),
        nsfw: false,
        trailerYtId: faker_1.faker.internet.url(),
        rating: 9,
        ...override,
    }, id);
    return anime;
}
exports.makeAnime = makeAnime;
async function makePrismaAnime(data = {}) {
    const anime = makeAnime(data);
    await prisma_1.prisma.anime.create({ data: prisma_anime_mapper_1.PrismaAnimeMapper.toPrisma(anime) });
    return anime;
}
exports.makePrismaAnime = makePrismaAnime;
