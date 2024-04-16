"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const make_upload_animes_use_case_1 = require("@/infra/factories/animes/make-upload-animes-use-case");
const zod_1 = require("zod");
async function upload(request, reply) {
    const uploadAnimesBodySchema = zod_1.z.object({
        genre: zod_1.z.string(),
        page: zod_1.z
            .string()
            .transform((state) => Number(state))
            .default('1'),
    });
    const { page, genre } = uploadAnimesBodySchema.parse(request.body);
    const useCase = (0, make_upload_animes_use_case_1.makeUploadAnimeUseCase)();
    await useCase.execute({ genre, page });
    return reply.status(201).send();
}
exports.upload = upload;
