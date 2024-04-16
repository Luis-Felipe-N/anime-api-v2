"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPresenter = void 0;
class CommentPresenter {
    static toHTTP(comment) {
        return {
            id: comment.id.toString(),
            content: comment.content,
            authorId: comment.authorId.toString(),
            episodeId: comment.episodeId.toString,
            parentId: comment.parentId,
            updatedAt: comment.updatedAt,
            createdAt: comment.createdAt,
        };
    }
}
exports.CommentPresenter = CommentPresenter;
