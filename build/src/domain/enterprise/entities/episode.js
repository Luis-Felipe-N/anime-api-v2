"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
const entity_1 = require("@/core/entities/entity");
const slug_1 = require("@/core/values-objects/slug");
const dayjs_1 = __importDefault(require("dayjs"));
class Episode extends entity_1.Entity {
    get title() {
        return this.props.title;
    }
    get index() {
        return this.props.index;
    }
    get seasonId() {
        return this.props.seasonId;
    }
    get description() {
        return this.props.description;
    }
    get cover() {
        return this.props.cover;
    }
    get video() {
        return this.props.video;
    }
    get duration() {
        return this.props.duration;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get slug() {
        return this.props.slug;
    }
    get type() {
        return this.props.type;
    }
    get season() {
        return this.props.season;
    }
    get isNew() {
        return (0, dayjs_1.default)().diff(this.createdAt, 'days') <= 3;
    }
    get excerpt() {
        if (this.props.description) {
            return this.props.description.slice(0, 80).trimEnd().concat('...');
        }
    }
    static create(props, id) {
        const episode = new Episode({
            ...props,
            slug: props.slug ?? slug_1.Slug.createFromText(props.title),
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return episode;
    }
}
exports.Episode = Episode;
