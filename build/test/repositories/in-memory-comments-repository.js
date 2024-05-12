"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCommentsRepository = void 0;
class InMemoryCommentsRepository {
    constructor() {
        this.items = [];
    }
    async create(comment) {
        this.items.push(comment);
    }
    async delete(comment) {
        const commentIndex = this.items.findIndex((item) => item.id === comment.id);
        this.items.splice(commentIndex, 1);
    }
    async findById(id) {
        const comment = this.items.find((item) => item.id.toString() === id);
        if (!comment) {
            return null;
        }
        return comment;
    }
    async fetchCommentsByEpisode(episodeId, params) {
        const comments = this.items
            .filter((item) => item.episodeId.toString() === episodeId)
            .slice((params.page - 1) * 20, params.page * 20);
        return comments;
    }
}
exports.InMemoryCommentsRepository = InMemoryCommentsRepository;
