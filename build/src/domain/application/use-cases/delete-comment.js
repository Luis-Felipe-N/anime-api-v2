"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const not_allowed_error_1 = require("./errors/not-allowed-error");
class DeleteCommentUseCase {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async execute({ id, userId, }) {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (userId !== comment.authorId.toString()) {
            return (0, either_1.failure)(new not_allowed_error_1.NotAllowedError());
        }
        await this.commentsRepository.delete(comment);
        return (0, either_1.success)({});
    }
}
exports.DeleteCommentUseCase = DeleteCommentUseCase;
