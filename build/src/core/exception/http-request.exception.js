"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(response, status) {
        super();
        this.response = response;
        this.status = status;
        this.message = response;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
}
exports.HttpException = HttpException;
