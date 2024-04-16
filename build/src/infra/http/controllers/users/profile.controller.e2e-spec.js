"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/app");
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Profile (e2e)', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.it)('should be to able get profile', async () => {
        await (0, supertest_1.default)(app_1.app.server).post('/users').send({
            name: 'Luis Felipe',
            email: 'luiss@gmail.com',
            password: '123456',
        });
        const sessionsResponse = await (0, supertest_1.default)(app_1.app.server).post('/sessions').send({
            email: 'luiss@gmail.com',
            password: '123456',
        });
        const { token } = sessionsResponse.body;
        const response = await (0, supertest_1.default)(app_1.app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`);
        (0, vitest_1.expect)(response.statusCode).toEqual(200);
        // expect(response.body).toEqual({
        //   token: expect.any(String),
        // })
    });
});
