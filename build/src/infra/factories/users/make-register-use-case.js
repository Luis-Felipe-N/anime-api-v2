"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterUseCase = void 0;
const register_1 = require("@/domain/application/use-cases/register");
const prisma_users_repository_1 = require("@/infra/database/repositories/prisma-users-repository");
function makeRegisterUseCase() {
    const usersRepository = new prisma_users_repository_1.PrismaUsersRepository();
    const useCase = new register_1.RegisterUseCase(usersRepository);
    return useCase;
}
exports.makeRegisterUseCase = makeRegisterUseCase;
