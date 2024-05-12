"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seasonsRouter = void 0;
const fetch_seasons_by_anime_controller_1 = require("./fetch-seasons-by-anime.controller");
const get_controller_1 = require("./get.controller");
async function seasonsRouter(app) {
    // app.post('/seasons')
    app.get('/seasons/:id', get_controller_1.getById);
    app.get('/seasons/anime/:animeId', fetch_seasons_by_anime_controller_1.fetchSeasonsByAnime);
}
exports.seasonsRouter = seasonsRouter;
