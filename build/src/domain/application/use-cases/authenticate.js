"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const invalid_credentials_error_1 = require("./errors/invalid-credentials-error");
const either_1 = require("@/core/either");
class AuthenticateUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ email, password, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            return (0, either_1.failure)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const doesPasswordMatch = await (0, bcryptjs_1.compare)(password, user.password_hash);
        if (!doesPasswordMatch) {
            return (0, either_1.failure)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        return (0, either_1.success)({ user });
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;
