"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_comments_repository_1 = require("test/repositories/in-memory-comments-repository");
const comment_on_episode_1 = require("./comment-on-episode");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_episode_1 = require("test/factories/make-episode");
let inMemoryCommentsRepository;
let inMemoryEpisodesRepository;
let sut;
describe('Create comment', () => {
    beforeEach(() => {
        inMemoryCommentsRepository = new in_memory_comments_repository_1.InMemoryCommentsRepository();
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        sut = new comment_on_episode_1.CommentOnEpisodeUseCase(inMemoryCommentsRepository, inMemoryEpisodesRepository);
    });
    it('should be able to create a comment', async () => {
        const episode = (0, make_episode_1.makeEpisode)();
        await inMemoryEpisodesRepository.create(episode);
        const result = await sut.execute({
            authorId: '1',
            episodeId: episode.id.toString(),
            content: 'Conteúdo do comentário',
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.comment.content).toEqual('Conteúdo do comentário');
            expect(inMemoryCommentsRepository.items[0].id).toEqual(result.value.comment.id);
        }
    });
});
