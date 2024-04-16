"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anime = void 0;
const slug_1 = require("@/core/values-objects/slug");
const entity_1 = require("@/core/entities/entity");
const season_list_1 = require("./season-list");
const genre_list_1 = require("./genre-list");
const valide_yotube_video_id_1 = require("@/core/uteis/valide-yotube-video-id");
class Anime extends entity_1.Entity {
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get slug() {
        return this.props.slug;
    }
    get banner() {
        return this.props.banner;
    }
    get cover() {
        return this.props.cover;
    }
    get nsfw() {
        if (this.props.genres
            .getItems()
            .find((item) => item.slug.value === 'sem-censura' || item.slug.value === '18'))
            return true;
        return this.props.nsfw;
    }
    get trailerYtId() {
        return this.props.trailerYtId;
    }
    get seasons() {
        return this.props.seasons;
    }
    get genres() {
        return this.props.genres;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get rating() {
        return this.props.rating;
    }
    get excerpt() {
        return this.props.description.slice(0, 120).trimEnd().concat('...');
    }
    get videoIdIsValid() {
        if (!this.props.trailerYtId)
            return false;
        return (0, valide_yotube_video_id_1.valideYoutubeVideoId)(this.props.trailerYtId);
    }
    set seasons(seasons) {
        this.props.seasons = seasons;
        this.touch();
    }
    set genres(genres) {
        this.props.genres = genres;
        this.touch();
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const anime = new Anime({
            ...props,
            slug: props.slug ?? slug_1.Slug.createFromText(props.title),
            createdAt: new Date(),
            seasons: props.seasons ?? new season_list_1.SeasonList(),
            genres: props.genres ?? new genre_list_1.GenreList(),
        }, id);
        return anime;
    }
}
exports.Anime = Anime;
