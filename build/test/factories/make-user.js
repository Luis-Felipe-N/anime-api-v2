"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrismaUser = exports.makeUser = void 0;
const user_1 = require("@/domain/enterprise/entities/user");
const prisma_user_mapper_1 = require("@/infra/database/mapper/prisma-user-mapper");
const prisma_1 = require("@/infra/database/prisma/prisma");
const faker_1 = require("@faker-js/faker");
function makeUser(override = {}, id) {
    const user = user_1.User.create({
        role: 'USER',
        email: faker_1.faker.internet.email(),
        name: faker_1.faker.person.fullName(),
        password_hash: faker_1.faker.word.sample(),
        ...override,
    }, id);
    return user;
}
exports.makeUser = makeUser;
async function makePrismaUser(data = {}) {
    const user = makeUser(data);
    await prisma_1.prisma.user.create({ data: prisma_user_mapper_1.PrismaUserMapper.toPrisma(user) });
    return user;
}
exports.makePrismaUser = makePrismaUser;
