"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUsersRepository = void 0;
class InMemoryUsersRepository {
    constructor() {
        this.items = [];
    }
    async findById(id) {
        const userMemory = this.items.find((user) => id === user.id.toString());
        if (!userMemory) {
            return null;
        }
        return userMemory;
    }
    async create(user) {
        this.items.push(user);
        return user;
    }
    async findByEmail(email) {
        const userMemory = this.items.find((user) => email === user.email);
        if (!userMemory) {
            return null;
        }
        return userMemory;
    }
}
exports.InMemoryUsersRepository = InMemoryUsersRepository;
