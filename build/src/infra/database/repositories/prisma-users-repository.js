"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const prisma_1 = require("../prisma/prisma");
const prisma_user_mapper_1 = require("../mapper/prisma-user-mapper");
class PrismaUsersRepository {
    async findById(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return null;
        }
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(user);
    }
    async create(user) {
        const data = prisma_user_mapper_1.PrismaUserMapper.toPrisma(user);
        const userPrisma = await prisma_1.prisma.user.create({
            data,
        });
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(userPrisma);
    }
    async findByEmail(email) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return null;
        }
        return prisma_user_mapper_1.PrismaUserMapper.toDomain(user);
    }
}
exports.PrismaUsersRepository = PrismaUsersRepository;
