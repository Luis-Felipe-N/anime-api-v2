"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAnimeUseCase = void 0;
const anime_1 = require("@/domain/enterprise/entities/anime");
function makeAnimeUseCase(data) {
    const anime = anime_1.Anime.create({
        banner: data.banner,
        cover: data.cover,
        description: data.description,
        nsfw: data.nsfw,
        title: data.title,
        trailerYtId: data.trailerYtId,
        rating: data.rating,
    });
    return anime;
}
exports.makeAnimeUseCase = makeAnimeUseCase;
