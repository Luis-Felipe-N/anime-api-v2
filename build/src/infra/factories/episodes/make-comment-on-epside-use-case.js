"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCommentOnEpisodeUseCase = void 0;
const comment_on_episode_1 = require("@/domain/application/use-cases/comment-on-episode");
const prisma_comments_repository_1 = require("@/infra/database/repositories/prisma-comments-repository");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
function makeCommentOnEpisodeUseCase() {
    const commentsRepository = new prisma_comments_repository_1.PrismaCommentsRepository();
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const useCase = new comment_on_episode_1.CommentOnEpisodeUseCase(commentsRepository, episodesRepository);
    return useCase;
}
exports.makeCommentOnEpisodeUseCase = makeCommentOnEpisodeUseCase;
