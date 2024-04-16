"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const user_1 = require("@/domain/enterprise/entities/user");
class PrismaUserMapper {
    static toDomain(raw) {
        return user_1.User.create({
            role: raw.role,
            email: raw.email,
            name: raw.name,
            password_hash: raw.password_hash,
            avatar: raw.avatar,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            role: raw.role,
            email: raw.email,
            name: raw.name,
            password_hash: raw.password_hash,
            avatar: raw.avatar,
        };
    }
}
exports.PrismaUserMapper = PrismaUserMapper;
