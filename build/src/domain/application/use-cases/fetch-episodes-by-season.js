"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchEpisodeBySeasonUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class FetchEpisodeBySeasonUseCase {
    constructor(episodesRepository, seasonsRepository) {
        this.episodesRepository = episodesRepository;
        this.seasonsRepository = seasonsRepository;
    }
    async execute({ seasonId, page, }) {
        const season = await this.seasonsRepository.findById(seasonId);
        if (!season) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const episodes = await this.episodesRepository.findManyBySeason(seasonId, {
            page,
        });
        return (0, either_1.success)({ episodes });
    }
}
exports.FetchEpisodeBySeasonUseCase = FetchEpisodeBySeasonUseCase;
