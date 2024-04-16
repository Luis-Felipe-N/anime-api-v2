"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryGenresRepository = void 0;
class InMemoryGenresRepository {
    constructor() {
        this.items = [];
    }
    async create(genre) {
        this.items.push(genre);
    }
    async createMany(genres) {
        this.items.push(...genres);
    }
    async createFromScrapper(genre) {
        this.items.push(genre);
    }
    async createManyFromScrapper(genres) {
        this.items.push(...genres);
    }
    async delete(genre) {
        const genreIndex = this.items.findIndex((item) => item.id === genre.id);
        this.items.splice(genreIndex, 1);
    }
    async findBySlug(slug, animeId) {
        const genre = this.items.find((item) => item.slug.value === slug && item.animeId.toString() === animeId);
        if (!genre) {
            return null;
        }
        return genre;
    }
    async findById(id) {
        const genre = this.items.find((item) => item.id.toString() === id);
        if (!genre) {
            return null;
        }
        return genre;
    }
}
exports.InMemoryGenresRepository = InMemoryGenresRepository;
