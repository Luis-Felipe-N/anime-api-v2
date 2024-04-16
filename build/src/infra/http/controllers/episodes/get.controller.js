"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = void 0;
const zod_1 = require("zod");
const either_1 = require("@/core/either");
const make_get_episode_by_id_use_case_1 = require("@/infra/factories/episodes/make-get-episode-by-id-use-case");
const episode_presenters_1 = require("../../presenters/episode-presenters");
async function getById(request, reply) {
    const getByIdParamsSchema = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getByIdParamsSchema.parse(request.params);
    const useCase = (0, make_get_episode_by_id_use_case_1.makeGetEpisodeByIdUseCase)();
    const result = await useCase.execute({
        id,
    });
    if (result.isFailure()) {
        return (0, either_1.failure)(new Error());
    }
    return reply
        .status(200)
        .send({ episode: episode_presenters_1.EpisodePresenter.toHTTP(result.value.episode) });
}
exports.getById = getById;
