"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEpisodeBySlugUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class GetEpisodeBySlugUseCase {
    constructor(episodesRepository) {
        this.episodesRepository = episodesRepository;
    }
    async execute({ slug, }) {
        const episode = await this.episodesRepository.findBySlug(slug);
        if (!episode) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ episode });
    }
}
exports.GetEpisodeBySlugUseCase = GetEpisodeBySlugUseCase;
