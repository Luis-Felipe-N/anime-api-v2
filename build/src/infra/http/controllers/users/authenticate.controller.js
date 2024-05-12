"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const bad_request_exception_1 = require("@/core/exception/bad-request.exception");
const unauthorized_exception_1 = require("@/core/exception/unauthorized.exception");
const invalid_credentials_error_1 = require("@/domain/application/use-cases/errors/invalid-credentials-error");
const make_authenticate_use_case_1 = require("@/infra/factories/users/make-authenticate-use-case");
const zod_1 = require("zod");
async function authenticate(request, reply) {
    const authenticateBodySchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const { email, password } = authenticateBodySchema.parse(request.body);
    const authenticateUseCase = (0, make_authenticate_use_case_1.makeAuthenticateUseCase)();
    const result = await authenticateUseCase.execute({ email, password });
    if (result.isFailure()) {
        const error = result.value;
        switch (error.constructor) {
            case invalid_credentials_error_1.InvalidCredentialsError:
                throw new unauthorized_exception_1.UnauthorizedException(error.message);
            default:
                throw new bad_request_exception_1.BadRequestException(error.message);
        }
    }
    const token = await reply.jwtSign({}, {
        sign: {
            sub: result.value.user.id.toString(),
        },
    });
    return reply.status(200).send({
        token,
    });
    // try {
    // } catch (error) {
    //   if (error instanceof InvalidCredentialsError) {
    //     return reply.status(400).send({ message: error.message })
    //   }
    //   throw error
    // }
}
exports.authenticate = authenticate;
