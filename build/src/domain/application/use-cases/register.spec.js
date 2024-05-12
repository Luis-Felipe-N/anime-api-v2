"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const register_1 = require("./register");
const user_already_exists_error_1 = require("./errors/user-already-exists-error");
const bcryptjs_1 = require("bcryptjs");
const in_memory_users_repository_1 = require("test/repositories/in-memory-users-repository");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
let usersRepository;
let sut;
(0, vitest_1.describe)('Register Use Case', () => {
    (0, vitest_1.beforeEach)(() => {
        usersRepository = new in_memory_users_repository_1.InMemoryUsersRepository();
        sut = new register_1.RegisterUseCase(usersRepository);
    });
    (0, vitest_1.it)('Should be able to register', async () => {
        const result = await sut.execute({
            name: 'Teste da Silva',
            email: 'testedasilva01@gmail.com',
            password: '123456',
        });
        (0, vitest_1.expect)(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            (0, vitest_1.expect)(result.value.user.id).toEqual(vitest_1.expect.any(unique_entity_id_1.UniqueEntityId));
        }
    });
    (0, vitest_1.it)('should hash user password upon registration', async () => {
        const result = await sut.execute({
            name: 'Teste da Silva',
            email: 'testedasilva01@gmail.com',
            password: '123456',
        });
        (0, vitest_1.expect)(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            const passwordUserIsHashed = await (0, bcryptjs_1.compare)('123456', result.value.user.password_hash);
            return (0, vitest_1.expect)(passwordUserIsHashed).toBe(true);
        }
    });
    (0, vitest_1.it)('Should not be able to register with email twice', async () => {
        await sut.execute({
            name: 'Teste da Silva',
            email: 'testedasilva01@gmail.com',
            password: '123456',
        });
        const result = await sut.execute({
            name: 'Teste da Silva',
            email: 'testedasilva01@gmail.com',
            password: '123456',
        });
        (0, vitest_1.expect)(result.value).toBeInstanceOf(user_already_exists_error_1.UserAlreadyExistsError);
    });
});
