"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchSeasonsByAnimeUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class FetchSeasonsByAnimeUseCase {
    constructor(seasonRepository, animesRepository) {
        this.seasonRepository = seasonRepository;
        this.animesRepository = animesRepository;
    }
    async execute({ animeId, }) {
        const anime = await this.animesRepository.findById(animeId);
        if (!anime) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const seasons = await this.seasonRepository.findManyByAnime(animeId);
        return (0, either_1.success)({ seasons });
    }
}
exports.FetchSeasonsByAnimeUseCase = FetchSeasonsByAnimeUseCase;
