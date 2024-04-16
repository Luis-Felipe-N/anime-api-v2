"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const user_already_exists_error_1 = require("./errors/user-already-exists-error");
const bcryptjs_1 = require("bcryptjs");
const either_1 = require("@/core/either");
const user_1 = require("@/domain/enterprise/entities/user");
class RegisterUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ name, email, password, }) {
        const password_hash = await (0, bcryptjs_1.hash)(password, 6);
        const UserAlreadyExistsErrorSameEmail = await this.usersRepository.findByEmail(email);
        if (UserAlreadyExistsErrorSameEmail) {
            return (0, either_1.failure)(new user_already_exists_error_1.UserAlreadyExistsError());
        }
        const user = user_1.User.create({
            role: 'USER',
            name,
            email,
            password_hash,
        });
        const userCreated = await this.usersRepository.create(user);
        return (0, either_1.success)({
            user: userCreated,
        });
    }
}
exports.RegisterUseCase = RegisterUseCase;
