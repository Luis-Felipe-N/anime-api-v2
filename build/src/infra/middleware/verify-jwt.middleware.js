"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtMiddleware = void 0;
async function verifyJwtMiddleware(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (error) {
        reply.status(401).send({
            message: 'Unauthorized',
        });
    }
}
exports.verifyJwtMiddleware = verifyJwtMiddleware;
