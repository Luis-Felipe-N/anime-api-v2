"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchCommentsByEpisodeUseCase = void 0;
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const either_1 = require("@/core/either");
class FetchCommentsByEpisodeUseCase {
    constructor(commentsRepository, episodesRepository) {
        this.commentsRepository = commentsRepository;
        this.episodesRepository = episodesRepository;
    }
    async execute({ episodeId, page, }) {
        const episode = await this.episodesRepository.findById(episodeId);
        if (!episode) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const comments = await this.commentsRepository.fetchCommentsByEpisode(episodeId, {
            page,
        });
        return (0, either_1.success)({ comments });
    }
}
exports.FetchCommentsByEpisodeUseCase = FetchCommentsByEpisodeUseCase;
