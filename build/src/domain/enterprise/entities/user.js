"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Type = void 0;
const entity_1 = require("@/core/entities/entity");
exports.Type = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};
class User extends entity_1.Entity {
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password_hash() {
        return this.props.password_hash;
    }
    get role() {
        return this.props.role;
    }
    get avatar() {
        return this.props.avatar;
    }
    set password_hash(password_hash) {
        this.props.password_hash = password_hash;
    }
    static create(props, id) {
        const user = new User({
            ...props,
        }, id);
        return user;
    }
}
exports.User = User;
