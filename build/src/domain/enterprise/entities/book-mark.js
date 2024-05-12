"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMark = void 0;
const entity_1 = require("@/core/entities/entity");
class BookMark extends entity_1.Entity {
    get episodeId() {
        return this.props.episodeId;
    }
    get userId() {
        return this.props.userId;
    }
    get duration() {
        return this.props.duration;
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
    set duration(duration) {
        this.props.duration = duration;
        this.touch();
    }
    static create(props, id) {
        const bookMark = new BookMark({
            ...props,
            createdAt: new Date(),
        }, id);
        return bookMark;
    }
}
exports.BookMark = BookMark;
