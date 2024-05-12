"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bad_request_exception_1 = require("@/core/exception/bad-request.exception");
const conflict_exception_1 = require("@/core/exception/conflict.exception");
const user_already_exists_error_1 = require("@/domain/application/use-cases/errors/user-already-exists-error");
const make_register_use_case_1 = require("@/infra/factories/users/make-register-use-case");
const zod_1 = require("zod");
const user_presenters_1 = require("../../presenters/user-presenters");
async function register(request, reply) {
    const registerBodySchema = zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const { name, email, password } = registerBodySchema.parse(request.body);
    const useCase = (0, make_register_use_case_1.makeRegisterUseCase)();
    const result = await useCase.execute({ name, email, password });
    if (result.isFailure()) {
        const error = result.value;
        switch (error.constructor) {
            case user_already_exists_error_1.UserAlreadyExistsError:
                throw new conflict_exception_1.ConflictException(error.message);
            default:
                throw new bad_request_exception_1.BadRequestException(error.message);
        }
    }
    return reply
        .status(201)
        .send({ user: user_presenters_1.UserPresenter.toHTTP(result.value.user) });
}
exports.register = register;
