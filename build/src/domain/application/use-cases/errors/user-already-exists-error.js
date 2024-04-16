"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
class UserAlreadyExistsError extends Error {
    constructor() {
        super('User with e-email already exits');
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
