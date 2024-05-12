"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrismaEpisode = exports.makeEpisode = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const episode_1 = require("@/domain/enterprise/entities/episode");
const prisma_episode_mapper_1 = require("@/infra/database/mapper/prisma-episode-mapper");
const prisma_1 = require("@/infra/database/prisma/prisma");
const faker_1 = require("@faker-js/faker");
function makeEpisode(override = {}, id) {
    const episode = episode_1.Episode.create({
        title: faker_1.faker.lorem.sentence(),
        description: faker_1.faker.lorem.text(),
        cover: faker_1.faker.image.url(),
        duration: 800,
        index: 0,
        type: 'ANIMESONLINE',
        video: faker_1.faker.internet.url(),
        seasonId: new unique_entity_id_1.UniqueEntityId(),
        ...override,
    }, id);
    return episode;
}
exports.makeEpisode = makeEpisode;
async function makePrismaEpisode(data = {}) {
    const episode = makeEpisode(data);
    await prisma_1.prisma.episode.create({ data: prisma_episode_mapper_1.PrismaEpisodeMapper.toPrisma(episode) });
    return episode;
}
exports.makePrismaEpisode = makePrismaEpisode;
