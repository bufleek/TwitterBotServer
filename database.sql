CREATE DATABASE twitter_bot;

CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL
);

CREATE TABLE media(
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    reply_id INT,
    CONSTRAINT fk_reply
        FOREIGN KEY (reply_id)
            REFERENCES replies(id)
                ON DELETE CASCADE
);

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);