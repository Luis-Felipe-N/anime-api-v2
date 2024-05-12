"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxDistanceError = void 0;
class MaxDistanceError extends Error {
    constructor() {
        super('Max distance reached.');
    }
}
exports.MaxDistanceError = MaxDistanceError;
