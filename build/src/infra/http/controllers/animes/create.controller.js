"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const make_upload_anime_by_slug_use_case_1 = require("@/infra/factories/animes/make-upload-anime-by-slug-use-case");
const zod_1 = require("zod");
async function create(request, reply) {
    const createAnimeBodySchema = zod_1.z.object({
        slug: zod_1.z.string(),
    });
    const { slug } = createAnimeBodySchema.parse(request.body);
    const useCase = (0, make_upload_anime_by_slug_use_case_1.makeUploadAnimeBySlugUseCase)();
    await useCase.execute({ slug });
    return reply.status(201).send();
}
exports.create = create;
