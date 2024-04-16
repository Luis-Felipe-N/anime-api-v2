"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeList = void 0;
const watched_list_1 = require("@/core/entities/watched-list");
class EpisodeList extends watched_list_1.WatchedList {
    compareItems(a, b) {
        return a.id.toString() === b.id.toString();
    }
}
exports.EpisodeList = EpisodeList;
