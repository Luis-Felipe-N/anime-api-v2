"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
const entity_1 = require("@/core/entities/entity");
const slug_1 = require("@/core/values-objects/slug");
const episode_list_1 = require("./episode-list");
class Season extends entity_1.Entity {
    get title() {
        return this.props.title;
    }
    get slug() {
        return this.props.slug;
    }
    get episodes() {
        return this.props.episodes;
    }
    get animeId() {
        return this.props.animeId;
    }
    set episodes(episodes) {
        this.props.episodes = episodes;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get anime() {
        return this.props.anime;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const season = new Season({
            ...props,
            slug: props.slug ?? slug_1.Slug.createFromText(props.title),
            createdAt: new Date(),
            episodes: props.episodes ?? new episode_list_1.EpisodeList(),
        }, id);
        return season;
    }
}
exports.Season = Season;
