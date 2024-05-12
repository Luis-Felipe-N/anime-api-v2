"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv");
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    NODE_ENV: zod_1.default.enum(['dev', 'test', 'prod']).default('dev'),
    PORT: zod_1.default.coerce.number().default(3333),
    SECRET_KEY: zod_1.default.string().default('sdokhashascxzxc'),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.log(`Invalid environments variables - ${String(_env.error)}`);
    throw new Error('Invalid environments variables');
}
exports.env = _env.data;
