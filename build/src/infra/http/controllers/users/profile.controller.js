"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const make_get_user_profile_use_case_1 = require("@/infra/factories/users/make-get-user-profile-use-case");
const user_presenters_1 = require("../../presenters/user-presenters");
const bad_request_exception_1 = require("@/core/exception/bad-request.exception");
async function profile(request, reply) {
    const useCase = (0, make_get_user_profile_use_case_1.makeGetUserProfileUseCase)();
    const result = await useCase.execute({
        userId: request.user.sub,
    });
    if (result.isFailure()) {
        throw new bad_request_exception_1.BadRequestException();
    }
    return reply.status(200).send({
        user: user_presenters_1.UserPresenter.toHTTP(result.value.user),
    });
}
exports.profile = profile;
