"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_user_profile_1 = require("./get-user-profile");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const bcryptjs_1 = require("bcryptjs");
const in_memory_users_repository_1 = require("test/repositories/in-memory-users-repository");
const make_user_1 = require("test/factories/make-user");
let usersRepository;
let sut;
(0, vitest_1.describe)('Get User Profile Use Case', () => {
    (0, vitest_1.beforeEach)(() => {
        usersRepository = new in_memory_users_repository_1.InMemoryUsersRepository();
        sut = new get_user_profile_1.GetUserProfileUseCase(usersRepository);
    });
    (0, vitest_1.it)('should be able to get user profile', async () => {
        const user = (0, make_user_1.makeUser)({
            name: 'Teste da Silva',
            email: 'testedasilva@gmail.com',
            password_hash: await (0, bcryptjs_1.hash)('123456', 6),
        });
        const createdUser = await usersRepository.create(user);
        const result = await sut.execute({ userId: createdUser.id.toString() });
        (0, vitest_1.expect)(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            (0, vitest_1.expect)(result.value.user.name).toBe('Teste da Silva');
        }
    });
    (0, vitest_1.it)('should not be able to get user profile with wrong id', async () => {
        const result = await sut.execute({ userId: 'non-exists-id' });
        (0, vitest_1.expect)(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
