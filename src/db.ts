
import {Pool} from 'pg';

export const pool = new Pool({
    user: 'ived',
    password: 'postgre@usr#ived',
    database: 'twitter_bot',
    port: 5432,
    host: 'localhost'
});