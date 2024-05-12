"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
class ResourceNotFoundError extends Error {
    constructor() {
        super('Resource not found');
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
