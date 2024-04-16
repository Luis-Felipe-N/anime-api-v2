"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCommentMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const comment_1 = require("@/domain/enterprise/entities/comment");
class PrismaCommentMapper {
    static toDomain(raw) {
        return comment_1.Comment.create({
            content: raw.content,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            authorId: new unique_entity_id_1.UniqueEntityId(raw.authorId),
            episodeId: new unique_entity_id_1.UniqueEntityId(raw.episodeId),
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            content: raw.content,
            authorId: raw.authorId.toString(),
            episodeId: raw.episodeId.toString(),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    }
    static toPrismaMany(raws) {
        return raws.map((raw) => ({
            id: raw.id.toString(),
            content: raw.content,
            authorId: raw.authorId.toString(),
            episodeId: raw.episodeId.toString(),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }));
    }
}
exports.PrismaCommentMapper = PrismaCommentMapper;
