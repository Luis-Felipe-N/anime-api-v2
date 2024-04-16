"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeComment = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const comment_1 = require("@/domain/enterprise/entities/comment");
const faker_1 = require("@faker-js/faker");
function makeComment(override = {}, id) {
    const comment = comment_1.Comment.create({
        authorId: new unique_entity_id_1.UniqueEntityId(),
        episodeId: new unique_entity_id_1.UniqueEntityId(),
        content: faker_1.faker.lorem.text(),
        ...override,
    }, id);
    return comment;
}
exports.makeComment = makeComment;
