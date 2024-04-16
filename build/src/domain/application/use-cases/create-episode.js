"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEpisodeUseCase = void 0;
const episode_1 = require("@/domain/enterprise/entities/episode");
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class CreateEpisodeUseCase {
    constructor(episodesRepository, animesRepository) {
        this.episodesRepository = episodesRepository;
        this.animesRepository = animesRepository;
    }
    async execute({ animeId, title, cover, description, duration, index, season, }) {
        const anime = await this.animesRepository.findById(animeId);
        if (!anime) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const episode = episode_1.Episode.create({
            animeId: anime.id,
            title,
            description,
            cover,
            index,
            duration,
            season,
        });
        await this.episodesRepository.create(episode);
        return (0, either_1.success)({ episode });
    }
}
exports.CreateEpisodeUseCase = CreateEpisodeUseCase;
