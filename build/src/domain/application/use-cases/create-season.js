"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeasonUseCase = void 0;
const season_1 = require("@/domain/enterprise/entities/season");
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const episode_1 = require("@/domain/enterprise/entities/episode");
const episode_list_1 = require("@/domain/enterprise/entities/episode-list");
class CreateSeasonUseCase {
    constructor(seasonsRepository, animesRepository) {
        this.seasonsRepository = seasonsRepository;
        this.animesRepository = animesRepository;
    }
    async execute({ title, animeId, episodes, }) {
        const anime = await this.animesRepository.findById(animeId);
        if (!anime) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const season = season_1.Season.create({
            title,
            animeId: anime.id,
        });
        const seasonsEpisodes = episodes.map((episode) => episode_1.Episode.create({
            title: episode.title,
            description: episode.description,
            cover: episode.cover,
            index: episode.index,
            duration: episode.duration,
            seasonId: season.id,
            slug: episode.slug,
        }, episode.id));
        season.episodes = new episode_list_1.EpisodeList(seasonsEpisodes);
        await this.seasonsRepository.create(season);
        return (0, either_1.success)({ season });
    }
}
exports.CreateSeasonUseCase = CreateSeasonUseCase;
