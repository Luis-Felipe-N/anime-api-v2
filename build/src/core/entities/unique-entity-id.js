"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityId = void 0;
const crypto_1 = require("crypto");
class UniqueEntityId {
    toString() {
        return this.value;
    }
    toString() {
        return this.value;
    }
    constructor(value) {
        this.value = value ?? (0, crypto_1.randomUUID)();
    }
}
exports.UniqueEntityId = UniqueEntityId;
