"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeasonByIdUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
class GetSeasonByIdUseCase {
    constructor(seasonsRepository) {
        this.seasonsRepository = seasonsRepository;
    }
    async execute({ id, }) {
        const season = await this.seasonsRepository.findById(id);
        if (!season) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ season });
    }
}
exports.GetSeasonByIdUseCase = GetSeasonByIdUseCase;
