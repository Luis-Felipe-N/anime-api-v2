"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnimeUseCase = void 0;
const either_1 = require("@/core/either");
const anime_1 = require("@/domain/enterprise/entities/anime");
const genre_1 = require("@/domain/enterprise/entities/genre");
const genre_list_1 = require("@/domain/enterprise/entities/genre-list");
const season_1 = require("@/domain/enterprise/entities/season");
const season_list_1 = require("@/domain/enterprise/entities/season-list");
class CreateAnimeUseCase {
    constructor(animesRepository) {
        this.animesRepository = animesRepository;
    }
    async execute({ banner, cover, description, title, seasons, genres, nsfw, trailerYtId = null, }) {
        const anime = anime_1.Anime.create({
            banner,
            cover,
            description,
            title,
            nsfw,
            trailerYtId,
        });
        const animeSeasons = seasons.map((season) => season_1.Season.create({
            title: season.title,
            createdAt: season.createdAt,
            updatedAt: season.updatedAt,
            animeId: anime.id,
        }, season.id));
        const animeGenres = genres.map((genre) => genre_1.Genre.create({
            title: genre.title,
            animeId: anime.id,
        }, genre.id));
        anime.seasons = new season_list_1.SeasonList(animeSeasons);
        anime.genres = new genre_list_1.GenreList(animeGenres);
        await this.animesRepository.create(anime);
        return (0, either_1.success)({ anime });
    }
}
exports.CreateAnimeUseCase = CreateAnimeUseCase;
