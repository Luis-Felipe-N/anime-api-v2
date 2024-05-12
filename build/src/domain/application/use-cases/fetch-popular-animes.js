"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPopularAnimesUseCase = void 0;
const either_1 = require("@/core/either");
class FetchPopularAnimesUseCase {
    constructor(animesRepository) {
        this.animesRepository = animesRepository;
    }
    async execute() {
        const animes = await this.animesRepository.findManyPopular();
        return (0, either_1.success)({ animes });
    }
}
exports.FetchPopularAnimesUseCase = FetchPopularAnimesUseCase;
