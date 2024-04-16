"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
const http_status_enum_1 = require("../enums/http-status.enum");
const http_exception_body_1 = require("../uteis/http-exception-body");
const http_request_exception_1 = require("./http-request.exception");
class ConflictException extends http_request_exception_1.HttpException {
    constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message, error = 'Conflict') {
        super((0, http_exception_body_1.createHttpExceptionBody)(message, error, http_status_enum_1.HttpStatus.CONFLICT), http_status_enum_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.ConflictException = ConflictException;
