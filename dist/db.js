"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'ived',
    password: 'postgre@usr#ived',
    database: 'twitter_bot',
    port: 5432,
    host: 'localhost'
});
