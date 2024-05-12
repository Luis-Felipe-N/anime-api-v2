"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = void 0;
const zod_1 = require("zod");
const either_1 = require("@/core/either");
const make_comment_on_epside_use_case_1 = require("@/infra/factories/episodes/make-comment-on-epside-use-case");
const comment_presenters_1 = require("../../presenters/comment-presenters");
async function comment(request, reply) {
    const commentOnEpisodeBodySchema = zod_1.z.object({
        content: zod_1.z.string(),
    });
    const commentOnEpisodeParamsSchema = zod_1.z.object({
        episodeId: zod_1.z.string(),
    });
    const { content } = commentOnEpisodeBodySchema.parse(request.body);
    const { episodeId } = commentOnEpisodeParamsSchema.parse(request.params);
    const useCase = (0, make_comment_on_epside_use_case_1.makeCommentOnEpisodeUseCase)();
    const result = await useCase.execute({
        authorId: request.user.sub,
        content,
        episodeId
    });
    if (result.isFailure()) {
        return (0, either_1.failure)(new Error());
    }
    return reply
        .status(200)
        .send({ comment: comment_presenters_1.CommentPresenter.toHTTP(result.value.comment) });
}
exports.comment = comment;
