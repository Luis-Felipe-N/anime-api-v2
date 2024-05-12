"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAnimeBySlugUseCase = void 0;
const animes_online_1 = __importDefault(require("@/core/scrapper/animes-online"));
const either_1 = require("@/core/either");
const upload_anime_error_1 = require("./errors/upload-anime-error");
const season_list_1 = require("@/domain/enterprise/entities/season-list");
const genre_list_1 = require("@/domain/enterprise/entities/genre-list");
const make_anime_1 = require("../factories/make-anime");
const make_season_1 = require("../factories/make-season");
const make_genre_1 = require("../factories/make-genre");
class UploadAnimeBySlugUseCase {
    constructor(animesRepository) {
        this.animesRepository = animesRepository;
    }
    async execute({ slug, }) {
        const scraper = new animes_online_1.default();
        const result = await scraper.getAnimeBySlug(slug);
        if (result.isFailure()) {
            return (0, either_1.failure)(new upload_anime_error_1.UploadAnimeError());
        }
        const anime = (0, make_anime_1.makeAnimeUseCase)(result.value.anime);
        const animeSeasons = result.value.seasons.map((season) => (0, make_season_1.makeSeasonUseCase)(season));
        const animeGenres = result.value.genres.map((genre) => (0, make_genre_1.makeGenreUseCase)(genre));
        anime.seasons = new season_list_1.SeasonList(animeSeasons);
        anime.genres = new genre_list_1.GenreList(animeGenres);
        await this.animesRepository.createFromScrapper(anime);
        return (0, either_1.success)({ anime });
    }
}
exports.UploadAnimeBySlugUseCase = UploadAnimeBySlugUseCase;
