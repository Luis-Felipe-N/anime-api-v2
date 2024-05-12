"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.failure = exports.Success = exports.Failure = void 0;
// Error
class Failure {
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return false;
    }
    isFailure() {
        return true;
    }
}
exports.Failure = Failure;
// Success
class Success {
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return true;
    }
    isFailure() {
        return false;
    }
}
exports.Success = Success;
const failure = (value) => {
    return new Failure(value);
};
exports.failure = failure;
const success = (value) => {
    return new Success(value);
};
exports.success = success;
