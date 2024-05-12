"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNextEpisodeUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class GetNextEpisodeUseCase {
    constructor(episodesRepository, seasonsRepository, animesRepository) {
        this.episodesRepository = episodesRepository;
        this.seasonsRepository = seasonsRepository;
        this.animesRepository = animesRepository;
    }
    async execute({ animeId, seasonId, currentEpisodeIndex, }) {
        const anime = await this.animesRepository.findById(animeId);
        if (!anime) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const seasons = await this.seasonsRepository.findManyByAnime(animeId);
        if (!seasons) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const seasonIndex = seasons.findIndex((item) => item.id.toString() === seasonId);
        const season = seasons[seasonIndex];
        if (!season) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const episode = await this.episodesRepository.findByIndex(season.id.toString(), currentEpisodeIndex + 1);
        if (episode) {
            return (0, either_1.success)({ episode });
        }
        const nextSeason = seasons[seasonIndex + 1];
        if (!episode && !nextSeason) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const episodeNextSeason = await this.episodesRepository.findByIndex(nextSeason.id.toString(), 1);
        if (!episodeNextSeason) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ episode: episodeNextSeason });
    }
}
exports.GetNextEpisodeUseCase = GetNextEpisodeUseCase;
