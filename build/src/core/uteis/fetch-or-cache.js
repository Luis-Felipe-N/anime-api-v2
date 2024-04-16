"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrCache = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
async function fetchOrCache(url, ignoreCache = false) {
    if (!(0, fs_1.existsSync)('.cache')) {
        (0, fs_1.mkdirSync)('.cache');
    }
    if (!ignoreCache &&
        (0, fs_1.existsSync)(`.cache/${Buffer.from(url).toString('base64')}.html`)) {
        const HTMLData = await (0, promises_1.readFile)(`.cache/${Buffer.from(url).toString('base64')}.html`, { encoding: 'utf8' });
        return HTMLData;
    }
    else {
        try {
            const { data: HTMLData } = await axios_1.default.get(url);
            if (!ignoreCache && HTMLData) {
                (0, promises_1.writeFile)(`.cache/${Buffer.from(url).toString('base64')}.html`, HTMLData, { encoding: 'utf8' });
            }
            return HTMLData;
        }
        catch (error) { }
    }
}
exports.fetchOrCache = fetchOrCache;
