"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const entity_1 = require("@/core/entities/entity");
const slug_1 = require("@/core/values-objects/slug");
class Genre extends entity_1.Entity {
    get title() {
        return this.props.title;
    }
    get slug() {
        return this.props.slug;
    }
    get animeId() {
        return this.props.animeId;
    }
    static create(props, id) {
        const genre = new Genre({
            ...props,
            slug: props.slug ?? slug_1.Slug.createFromText(props.title),
        }, id);
        return genre;
    }
}
exports.Genre = Genre;
