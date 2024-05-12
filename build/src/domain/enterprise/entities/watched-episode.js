"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedEpisode = void 0;
const entity_1 = require("@/core/entities/entity");
class WatchedEpisode extends entity_1.Entity {
    get episodeId() {
        return this.props.episodeId;
    }
    get userId() {
        return this.props.userId;
    }
    get duration() {
        return this.props.duration;
    }
    set duration(duration) {
        this.props.duration = duration;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const watchedEpisode = new WatchedEpisode({
            ...props,
            createdAt: new Date(),
        }, id);
        return watchedEpisode;
    }
}
exports.WatchedEpisode = WatchedEpisode;
