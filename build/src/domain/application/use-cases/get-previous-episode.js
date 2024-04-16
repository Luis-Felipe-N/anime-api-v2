"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPreviousEpisodeUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class GetPreviousEpisodeUseCase {
    constructor(episodesRepository, seasonsRepository) {
        this.episodesRepository = episodesRepository;
        this.seasonsRepository = seasonsRepository;
    }
    async execute({ seasonId, currentEpisodeIndex, }) {
        if (currentEpisodeIndex < 1) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const season = await this.seasonsRepository.findById(seasonId);
        if (!season) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const episode = await this.episodesRepository.findByIndex(season.id.toString(), currentEpisodeIndex - 1);
        if (!episode) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ episode });
    }
}
exports.GetPreviousEpisodeUseCase = GetPreviousEpisodeUseCase;
