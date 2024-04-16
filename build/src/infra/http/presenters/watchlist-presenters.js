"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistPresenter = void 0;
// export interface UserProps {
//   name: string
//   email: string
//   password_hash: string
//   role: Type
//   // watchedepisodes Watched[]
//   // comments        Comment[]
// }
class WatchlistPresenter {
    static toHTTP(watchlist) {
        return {
            id: watchlist.id.toString(),
            userId: watchlist.userId.toString(),
            // animes: watchlist.animes.getItems().map(AnimePresenter.toHTTP),
            createdAt: watchlist.createdAt,
            updatedAt: watchlist.updatedAt,
        };
    }
}
exports.WatchlistPresenter = WatchlistPresenter;
