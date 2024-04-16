"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMoviesRepository = void 0;
class InMemoryMoviesRepository {
    constructor() {
        this.items = [];
    }
    async create(movie) {
        this.items.push(movie);
    }
}
exports.InMemoryMoviesRepository = InMemoryMoviesRepository;
