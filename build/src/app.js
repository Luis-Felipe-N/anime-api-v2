"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const zod_1 = require("zod");
const env_1 = require("./infra/env");
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
// import { usersRoutes } from './http/controllers/users/routes'
const routes_1 = require("./infra/http/controllers/animes/routes");
const routes_2 = require("./infra/http/controllers/season/routes");
const routes_3 = require("./infra/http/controllers/episodes/routes");
const routes_4 = require("./infra/http/controllers/users/routes");
exports.app = (0, fastify_1.default)();
exports.app.register(jwt_1.default, {
    secret: env_1.env.SECRET_KEY,
});
exports.app.register(cors_1.default, {
    origin: "*",
    // credentials: true
});
exports.app.register(routes_4.usersRoutes);
exports.app.register(routes_1.animesRouter);
exports.app.register(routes_2.seasonsRouter);
exports.app.register(routes_3.episodesRouter);
exports.app.setErrorHandler((error, _, reply) => {
    try {
        return reply
            .status(error.message.statusCode)
            .send({ message: error.message.error });
    }
    catch (error) { }
    if (error instanceof zod_1.ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation Error', issues: error.format() });
    }
    if (env_1.env.NODE_ENV !== 'prod') {
        console.error(error);
    }
    else {
        // Mandar o error para algum serviço de tratamento
    }
    return reply.status(500).send({ message: 'Internal server error' });
});
