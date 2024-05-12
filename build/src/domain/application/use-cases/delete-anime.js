"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAnimeUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class DeleteAnimeUseCase {
    constructor(animesRepository) {
        this.animesRepository = animesRepository;
    }
    async execute({ id, }) {
        const anime = await this.animesRepository.findById(id);
        if (!anime) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        // TODO: Verificar permissão para excluir
        await this.animesRepository.delete(anime);
        return (0, either_1.success)({});
    }
}
exports.DeleteAnimeUseCase = DeleteAnimeUseCase;
