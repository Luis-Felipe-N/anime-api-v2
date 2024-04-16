"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAnimesByGenreUseCase = void 0;
const either_1 = require("@/core/either");
class FetchAnimesByGenreUseCase {
    constructor(animesRepository, genresRepository) {
        this.animesRepository = animesRepository;
        this.genresRepository = genresRepository;
    }
    async execute({ genreSlug, page, }) {
        const animes = await this.animesRepository.findManyByGenre(genreSlug, {
            page,
        });
        return (0, either_1.success)({ animes });
    }
}
exports.FetchAnimesByGenreUseCase = FetchAnimesByGenreUseCase;
