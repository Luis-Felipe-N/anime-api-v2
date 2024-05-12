"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAnimeUseCase = void 0;
const either_1 = require("@/core/either");
class SearchAnimeUseCase {
    constructor(animesRepository) {
        this.animesRepository = animesRepository;
    }
    async execute({ keyword, page, }) {
        const animes = await this.animesRepository.findManyByKeyword(keyword, {
            page,
        });
        return (0, either_1.success)({ animes });
    }
}
exports.SearchAnimeUseCase = SearchAnimeUseCase;
