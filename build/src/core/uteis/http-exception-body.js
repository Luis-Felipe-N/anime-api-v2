"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpExceptionBody = void 0;
const shared_1 = require("./shared");
const createHttpExceptionBody = (message, error, statusCode) => {
    if (!message) {
        return { statusCode, error };
    }
    return (0, shared_1.isObject)(message) && !Array.isArray(message)
        ? message
        : { statusCode, error, message };
};
exports.createHttpExceptionBody = createHttpExceptionBody;
