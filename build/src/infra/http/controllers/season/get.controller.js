"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = void 0;
const zod_1 = require("zod");
const either_1 = require("@/core/either");
const season_presenters_1 = require("../../presenters/season-presenters");
const make_get_season_by_id_use_case_1 = require("@/infra/factories/seasons/make-get-season-by-id-use-case");
async function getById(request, reply) {
    const getByIdParamsSchema = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getByIdParamsSchema.parse(request.params);
    const useCase = (0, make_get_season_by_id_use_case_1.makeGetSeasonByIdUseCase)();
    const result = await useCase.execute({
        id,
    });
    if (result.isFailure()) {
        return (0, either_1.failure)(new Error());
    }
    return reply
        .status(200)
        .send({ season: season_presenters_1.SeasonPresenter.toHTTP(result.value.season) });
}
exports.getById = getById;
