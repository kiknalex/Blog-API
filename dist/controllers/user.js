"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    getUsers: (req, res) => {
        res.json({ user: "kiknalex", posts: "lala" });
    },
};
exports.default = user;
