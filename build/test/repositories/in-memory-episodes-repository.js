"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEpisodesRepository = void 0;
class InMemoryEpisodesRepository {
    constructor() {
        this.items = [];
    }
    async create(episode) {
        this.items.push(episode);
    }
    async createMany(episodes) {
        this.items.push(...episodes);
    }
    async createFromScrapper(episode) {
        this.items.push(episode);
    }
    async createManyFromScrapper(episodes) {
        this.items.push(...episodes);
    }
    async delete(episode) {
        const episodeIndex = this.items.findIndex((item) => item.id === episode.id);
        this.items.splice(episodeIndex, 1);
    }
    async findBySlug(slug) {
        const episode = this.items.find((item) => item.slug.value === slug);
        if (!episode) {
            return null;
        }
        return episode;
    }
    async findById(id) {
        const episode = this.items.find((item) => item.id.toString() === id);
        if (!episode) {
            return null;
        }
        return episode;
    }
    async findByIndex(seasonId, episodeIndex) {
        const episode = this.items.find((item) => item.index === episodeIndex &&
            item.seasonId.toString() === seasonId.toString());
        if (!episode)
            return null;
        return episode;
    }
    async findManyBySeason(seasonId) {
        const episodes = this.items.filter((item) => item.seasonId.toString() === seasonId);
        return episodes;
    }
}
exports.InMemoryEpisodesRepository = InMemoryEpisodesRepository;
