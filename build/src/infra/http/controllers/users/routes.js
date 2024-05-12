"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const register_controller_1 = require("./register.controller");
const authenticate_controller_1 = require("./authenticate.controller");
const profile_controller_1 = require("./profile.controller");
const verify_jwt_middleware_1 = require("@/infra/middleware/verify-jwt.middleware");
const anime_to_wacthlist_controller_1 = require("./anime-to-wacthlist.controller");
async function usersRoutes(app) {
    app.post('/users', register_controller_1.register);
    app.post('/sessions', authenticate_controller_1.authenticate);
    /** AUTHENTICATED */
    app.get('/me', { onRequest: [verify_jwt_middleware_1.verifyJwtMiddleware] }, profile_controller_1.profile);
    app.post('/watchlist', { onRequest: [verify_jwt_middleware_1.verifyJwtMiddleware] }, anime_to_wacthlist_controller_1.animeToWatchlist);
}
exports.usersRoutes = usersRoutes;
