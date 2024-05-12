"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
const vite_config_1 = __importDefault(require("./vite.config"));
exports.default = (0, config_1.mergeConfig)(vite_config_1.default, (0, config_1.defineConfig)({
    test: {
        exclude: [
            ...config_1.configDefaults.exclude,
            '**/*.e2e-{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
    },
}));
