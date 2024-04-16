"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrismaGenre = exports.makeGenre = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const genre_1 = require("@/domain/enterprise/entities/genre");
const prisma_genre_mapper_1 = require("@/infra/database/mapper/prisma-genre-mapper");
const prisma_1 = require("@/infra/database/prisma/prisma");
const faker_1 = require("@faker-js/faker");
function makeGenre(override = {}, id) {
    const genre = genre_1.Genre.create({
        title: faker_1.faker.lorem.sentence(),
        animeId: new unique_entity_id_1.UniqueEntityId(),
        ...override,
    }, id);
    return genre;
}
exports.makeGenre = makeGenre;
async function makePrismaGenre(data = {}) {
    const genre = makeGenre(data);
    await prisma_1.prisma.genre.create({ data: prisma_genre_mapper_1.PrismaGenreMapper.toPrisma(genre) });
    return genre;
}
exports.makePrismaGenre = makePrismaGenre;
