"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySeasonsRepository = void 0;
class InMemorySeasonsRepository {
    constructor(episodesRepository) {
        this.episodesRepository = episodesRepository;
        this.items = [];
    }
    async create(season) {
        this.items.push(season);
        this.episodesRepository.createMany(season.episodes.getItems());
    }
    async createMany(seasons) {
        this.items.push(...seasons);
    }
    async createFromScrapper(season) {
        this.items.push(season);
        this.episodesRepository.createManyFromScrapper(season.episodes.getItems());
    }
    async createManyFromScrapper(seasons) {
        this.items.push(...seasons);
    }
    async delete(season) {
        const seasonIndex = this.items.findIndex((item) => item.id === season.id);
        this.items.splice(seasonIndex, 1);
    }
    async findBySlug(slug) {
        const season = this.items.find((item) => item.slug.value === slug);
        if (!season) {
            return null;
        }
        return season;
    }
    async findById(id) {
        const season = this.items.find((item) => item.id.toString() === id);
        if (!season) {
            return null;
        }
        return season;
    }
    async findManyByAnime(animeId) {
        const seasons = this.items
            .filter((item) => item.animeId.toString() === animeId)
            .sort(function (o1, o2) {
            return o1.createdAt.getTime() - o2.createdAt.getTime();
        });
        return seasons;
    }
}
exports.InMemorySeasonsRepository = InMemorySeasonsRepository;
