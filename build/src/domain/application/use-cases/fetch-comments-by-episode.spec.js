"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_comments_by_episode_1 = require("./fetch-comments-by-episode");
const in_memory_comments_repository_1 = require("test/repositories/in-memory-comments-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_comment_1 = require("test/factories/make-comment");
const make_episode_1 = require("test/factories/make-episode");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
let inMemoryCommentsRepository;
let inMemoryEpisodesRepository;
let sut;
describe('Fetch Episodes by Anime', () => {
    beforeEach(() => {
        inMemoryCommentsRepository = new in_memory_comments_repository_1.InMemoryCommentsRepository();
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        sut = new fetch_comments_by_episode_1.FetchCommentsByEpisodeUseCase(inMemoryCommentsRepository, inMemoryEpisodesRepository);
    });
    it('should be able to fetch comments of an episode', async () => {
        const episode = (0, make_episode_1.makeEpisode)();
        await inMemoryEpisodesRepository.create(episode);
        await inMemoryCommentsRepository.create((0, make_comment_1.makeComment)({
            episodeId: episode.id,
            content: 'Conteúdo do comentário',
        }));
        const result = await sut.execute({
            episodeId: episode.id.toString(),
            page: 1,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.comments).toHaveLength(1);
            expect(result.value.comments).toEqual([
                expect.objectContaining({
                    episodeId: episode.id,
                    content: 'Conteúdo do comentário',
                }),
            ]);
        }
    });
    it('should not be able to fetch comments of an non-existent episode', async () => {
        const result = await sut.execute({
            episodeId: 'non-existent-anime',
            page: 1,
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
