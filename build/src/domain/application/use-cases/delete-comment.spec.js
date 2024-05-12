"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const in_memory_comments_repository_1 = require("test/repositories/in-memory-comments-repository");
const delete_comment_1 = require("./delete-comment");
const make_comment_1 = require("test/factories/make-comment");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const not_allowed_error_1 = require("./errors/not-allowed-error");
let inMemoryCommentsRepository;
let sut;
describe('Delete Comment', () => {
    beforeEach(() => {
        inMemoryCommentsRepository = new in_memory_comments_repository_1.InMemoryCommentsRepository();
        sut = new delete_comment_1.DeleteCommentUseCase(inMemoryCommentsRepository);
    });
    it('should be able to delete a comment', async () => {
        const comment = (0, make_comment_1.makeComment)({
            authorId: new unique_entity_id_1.UniqueEntityId('user-id'),
        }, new unique_entity_id_1.UniqueEntityId('comment-id'));
        await inMemoryCommentsRepository.create(comment);
        const result = await sut.execute({
            id: 'comment-id',
            userId: 'user-id',
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(inMemoryCommentsRepository.items).toHaveLength(0);
        }
    });
    it('should not be able to delete a non-existent comment', async () => {
        const comment = (0, make_comment_1.makeComment)({
            authorId: new unique_entity_id_1.UniqueEntityId('user-id'),
        }, new unique_entity_id_1.UniqueEntityId('comment-id'));
        await inMemoryCommentsRepository.create(comment);
        const result = await sut.execute({
            id: 'comment-id-02',
            userId: 'user-id',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
    it('should not be able to delete a comment from another author', async () => {
        const comment = (0, make_comment_1.makeComment)({
            authorId: new unique_entity_id_1.UniqueEntityId('author-id-01'),
        }, new unique_entity_id_1.UniqueEntityId('comment-id'));
        await inMemoryCommentsRepository.create(comment);
        const result = await sut.execute({
            id: 'comment-id',
            userId: 'author-id-02',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(not_allowed_error_1.NotAllowedError);
    });
});
