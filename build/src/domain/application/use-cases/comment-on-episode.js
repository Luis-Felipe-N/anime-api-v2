"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOnEpisodeUseCase = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const comment_1 = require("@/domain/enterprise/entities/comment");
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class CommentOnEpisodeUseCase {
    constructor(commentsRepository, episodesRepository) {
        this.commentsRepository = commentsRepository;
        this.episodesRepository = episodesRepository;
    }
    async execute({ authorId, content, episodeId, }) {
        const episode = await this.episodesRepository.findById(episodeId);
        if (!episode) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const comment = comment_1.Comment.create({
            authorId: new unique_entity_id_1.UniqueEntityId(authorId),
            episodeId: episode.id,
            content,
        });
        await this.commentsRepository.create(comment);
        return (0, either_1.success)({
            comment,
        });
    }
}
exports.CommentOnEpisodeUseCase = CommentOnEpisodeUseCase;
