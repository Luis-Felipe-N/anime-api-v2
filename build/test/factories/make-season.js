"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrismaSeason = exports.makeSeason = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const season_1 = require("@/domain/enterprise/entities/season");
const prisma_season_mapper_1 = require("@/infra/database/mapper/prisma-season-mapper");
const prisma_1 = require("@/infra/database/prisma/prisma");
const faker_1 = require("@faker-js/faker");
function makeSeason(override = {}, id) {
    const season = season_1.Season.create({
        animeId: new unique_entity_id_1.UniqueEntityId(),
        title: faker_1.faker.lorem.sentence(),
        ...override,
    }, id);
    return season;
}
exports.makeSeason = makeSeason;
async function makePrismaSeason(data = {}) {
    const season = makeSeason(data);
    await prisma_1.prisma.season.create({ data: prisma_season_mapper_1.PrismaSeasonMapper.toPrisma(season) });
    return season;
}
exports.makePrismaSeason = makePrismaSeason;
