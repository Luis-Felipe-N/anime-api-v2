"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEpisodeByIdUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class GetEpisodeByIdUseCase {
    constructor(episodesRepository) {
        this.episodesRepository = episodesRepository;
    }
    async execute({ id, }) {
        const episode = await this.episodesRepository.findById(id);
        if (!episode) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ episode });
    }
}
exports.GetEpisodeByIdUseCase = GetEpisodeByIdUseCase;
