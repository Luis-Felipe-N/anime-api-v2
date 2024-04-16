"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWatchedEpisodeUseCase = void 0;
const either_1 = require("@/core/either");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const watched_episode_1 = require("@/domain/enterprise/entities/watched-episode");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class CreateWatchedEpisodeUseCase {
    constructor(watchedEpisodesRepository, episodesRepository) {
        this.watchedEpisodesRepository = watchedEpisodesRepository;
        this.episodesRepository = episodesRepository;
    }
    async execute({ episodeId, userId, duration, }) {
        const episode = await this.episodesRepository.findById(episodeId);
        if (!episode) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const watchedEpisode = watched_episode_1.WatchedEpisode.create({
            episodeId: episode.id,
            userId: new unique_entity_id_1.UniqueEntityId(userId),
            duration,
        });
        await this.watchedEpisodesRepository.create(watchedEpisode);
        return (0, either_1.success)({ watchedEpisode });
    }
}
exports.CreateWatchedEpisodeUseCase = CreateWatchedEpisodeUseCase;
