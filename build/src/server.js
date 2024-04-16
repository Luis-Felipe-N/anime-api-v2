"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./infra/env");
app_1.app
    .listen({
    host: '0.0.0.0',
    port: env_1.env.PORT,
})
    .then(() => console.log('Server is running'));
