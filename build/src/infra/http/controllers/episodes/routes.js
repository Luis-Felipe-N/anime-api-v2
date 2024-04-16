"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodesRouter = void 0;
const fetch_episodes_by_season_controller_1 = require("./fetch-episodes-by-season.controller");
const get_controller_1 = require("./get.controller");
const get_next_episode_contoller_1 = require("./get-next-episode.contoller");
const verify_jwt_middleware_1 = require("@/infra/middleware/verify-jwt.middleware");
const comment_controller_1 = require("./comment.controller");
async function episodesRouter(app) {
    app.post('/episodes/next', get_next_episode_contoller_1.getNextEpisode);
    app.get('/episodes/:id', get_controller_1.getById);
    app.get('/episodes/season/:seasonId', fetch_episodes_by_season_controller_1.fetchEpisodesBySeason);
    /** AUTHENTICATED */
    app.post('/episodes/:episodeId/comments', { onRequest: [verify_jwt_middleware_1.verifyJwtMiddleware] }, comment_controller_1.comment);
}
exports.episodesRouter = episodesRouter;
