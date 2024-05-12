"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAnimeBySlugUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class GetAnimeBySlugUseCase {
    constructor(animesRepository) {
        this.animesRepository = animesRepository;
    }
    async execute({ slug, }) {
        const anime = await this.animesRepository.findBySlug(slug);
        if (!anime) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ anime });
    }
}
exports.GetAnimeBySlugUseCase = GetAnimeBySlugUseCase;
