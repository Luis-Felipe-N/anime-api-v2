"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
// export interface UserProps {
//   name: string
//   email: string
//   password_hash: string
//   role: Type
//   // watchedepisodes Watched[]
//   // comments        Comment[]
// }
class UserPresenter {
    static toHTTP(user) {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        };
    }
}
exports.UserPresenter = UserPresenter;
