"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticateUseCase = void 0;
const authenticate_1 = require("@/domain/application/use-cases/authenticate");
const prisma_users_repository_1 = require("@/infra/database/repositories/prisma-users-repository");
function makeAuthenticateUseCase() {
    const usersRepository = new prisma_users_repository_1.PrismaUsersRepository();
    const useCase = new authenticate_1.AuthenticateUseCase(usersRepository);
    return useCase;
}
exports.makeAuthenticateUseCase = makeAuthenticateUseCase;
