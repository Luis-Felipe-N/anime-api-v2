"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const authenticate_1 = require("./authenticate");
const bcryptjs_1 = require("bcryptjs");
const invalid_credentials_error_1 = require("./errors/invalid-credentials-error");
const in_memory_users_repository_1 = require("test/repositories/in-memory-users-repository");
const make_user_1 = require("test/factories/make-user");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
let usersRepository;
let sut;
(0, vitest_1.describe)('Authenticate Use Case', () => {
    (0, vitest_1.beforeEach)(() => {
        usersRepository = new in_memory_users_repository_1.InMemoryUsersRepository();
        sut = new authenticate_1.AuthenticateUseCase(usersRepository);
    });
    (0, vitest_1.it)('should be able to authenticate', async () => {
        const user = (0, make_user_1.makeUser)({
            email: 'testedasilva@gmail.com',
            password_hash: await (0, bcryptjs_1.hash)('123456', 6),
        });
        await usersRepository.create(user);
        const result = await sut.execute({
            email: 'testedasilva@gmail.com',
            password: '123456',
        });
        (0, vitest_1.expect)(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            (0, vitest_1.expect)(result.value.user.id).toEqual(vitest_1.expect.any(unique_entity_id_1.UniqueEntityId));
        }
    });
    // it('should no be able to authenticate with wrong email', async () => {
    //   await expect(
    //     sut.execute({
    //       email: 'testedasilva@gmail.com',
    //       password: '123456',
    //     }),
    //   ).rejects.toBeInstanceOf(InvalidCredentialsError)
    // })
    (0, vitest_1.it)('should no be able to authenticate with wrong password', async () => {
        const user = (0, make_user_1.makeUser)({
            email: 'testedasilva@gmail.com',
        });
        await usersRepository.create(user);
        const result = await sut.execute({
            email: 'testedasilva@gmail.com',
            password: '123456',
        });
        (0, vitest_1.expect)(result.isFailure()).toBe(true);
        (0, vitest_1.expect)(result.value).toBeInstanceOf(invalid_credentials_error_1.InvalidCredentialsError);
    });
});
