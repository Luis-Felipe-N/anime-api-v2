"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAnimesRepository = void 0;
const normalize_1 = require("@/core/values-objects/normalize");
class InMemoryAnimesRepository {
    constructor(seasonsRepository, genresRepository) {
        this.seasonsRepository = seasonsRepository;
        this.genresRepository = genresRepository;
        this.items = [];
    }
    async create(anime) {
        this.items.push(anime);
        this.seasonsRepository.createMany(anime.seasons.getItems());
        this.genresRepository.createMany(anime.genres.getItems());
    }
    async createFromScrapper(anime) {
        this.items.push(anime);
        this.seasonsRepository.createMany(anime.seasons.getItems());
        this.genresRepository.createMany(anime.genres.getItems());
    }
    async save(anime) {
        const animeIndex = this.items.findIndex((item) => item.id === anime.id);
        this.items[animeIndex] = anime;
        this.seasonsRepository.createMany(anime.seasons.getItems());
        this.genresRepository.createMany(anime.genres.getItems());
    }
    async delete(anime) {
        const animeIndex = this.items.findIndex((item) => item.id === anime.id);
        this.items.splice(animeIndex, 1);
    }
    async findBySlug(slug) {
        const anime = this.items.find((item) => item.slug.value === slug);
        if (!anime) {
            return null;
        }
        return anime;
    }
    async findById(id) {
        const anime = this.items.find((item) => item.id.toString() === id);
        if (!anime) {
            return null;
        }
        return anime;
    }
    async findManyByGenre(genreSlug, params) {
        const animes = this.items
            .filter((item) => item.genres.getItems().some((genre) => genre.slug.value === genreSlug))
            .slice((params.page - 1) * 20, params.page * 20);
        return animes;
    }
    async findManyByKeyword(keyword, params) {
        const animes = this.items
            .filter((item) => normalize_1.Normalize.normalizeText(item.title).includes(keyword) ||
            item.description.toLowerCase().includes(keyword))
            .slice((params.page - 1) * 20, params.page * 20);
        return animes;
    }
    async findManyPopular() {
        const animes = this.items.sort(function (o1, o2) {
            return o1.rating - o2.rating;
        });
        return animes.slice(0, 5);
    }
}
exports.InMemoryAnimesRepository = InMemoryAnimesRepository;
