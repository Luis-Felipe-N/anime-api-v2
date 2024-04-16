"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUserProfileUseCase = void 0;
const get_user_profile_1 = require("@/domain/application/use-cases/get-user-profile");
const prisma_users_repository_1 = require("@/infra/database/repositories/prisma-users-repository");
function makeGetUserProfileUseCase() {
    const usersRepository = new prisma_users_repository_1.PrismaUsersRepository();
    const useCase = new get_user_profile_1.GetUserProfileUseCase(usersRepository);
    return useCase;
}
exports.makeGetUserProfileUseCase = makeGetUserProfileUseCase;
