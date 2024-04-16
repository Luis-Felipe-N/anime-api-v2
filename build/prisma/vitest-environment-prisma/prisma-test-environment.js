"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const crypto_1 = require("crypto");
const child_process_1 = require("child_process");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function generateDatabaseURL(schema) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable');
    }
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);
    return url.toString();
}
exports.default = {
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = (0, crypto_1.randomUUID)();
        const databaseURL = generateDatabaseURL(schema);
        process.env.DATABASE_URL = databaseURL;
        (0, child_process_1.execSync)('npx prisma migrate deploy');
        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE
        `);
                await prisma.$disconnect();
            },
        };
    },
};
