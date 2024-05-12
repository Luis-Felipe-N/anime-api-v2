"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_status_enum_1 = require("../enums/http-status.enum");
const http_exception_body_1 = require("../uteis/http-exception-body");
const http_request_exception_1 = require("./http-request.exception");
class BadRequestException extends http_request_exception_1.HttpException {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message, error = 'Bad Request') {
        super((0, http_exception_body_1.createHttpExceptionBody)(message, error, http_status_enum_1.HttpStatus.BAD_REQUEST), http_status_enum_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
