"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileUseCase = void 0;
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const either_1 = require("@/core/either");
class GetUserProfileUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        return (0, either_1.success)({ user });
    }
}
exports.GetUserProfileUseCase = GetUserProfileUseCase;
