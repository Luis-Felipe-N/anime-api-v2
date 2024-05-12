"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animesRouter = void 0;
const create_controller_1 = require("./create.controller");
const fetch_by_genre_controller_1 = require("./fetch-by-genre.controller");
const get_by_slug_controller_1 = require("./get-by-slug.controller");
const seach_controller_1 = require("./seach.controller");
const upload_controller_1 = require("./upload.controller");
const fetch_popular_animes_controller_1 = require("./fetch-popular-animes.controller");
async function animesRouter(app) {
    app.post('/animes', create_controller_1.create);
    app.post('/animes/upload', upload_controller_1.upload);
    app.get('/animes', seach_controller_1.search);
    app.get('/animes/popular', fetch_popular_animes_controller_1.popular);
    app.get('/animes/:slug', get_by_slug_controller_1.getBySlug);
    app.get('/animes/genre/:slug', fetch_by_genre_controller_1.fetchByGenre);
}
exports.animesRouter = animesRouter;
