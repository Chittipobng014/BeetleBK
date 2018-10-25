DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS boxes;
DROP TABLE IF EXISTS transactions;

CREATE TABLE events (
    boxid TEXT NOT NULL,
    transactionid int NOT NULL,
    passcode TEXT NOT NULL,
    faceid TEXT NOT NULL,
    checkin TEXT NOT NULL,
    checkout TEXT NOT NULL,
    branchid int NOT NULL,
    phonenumber TEXT NOT NULL,
    price int NOT NULL
);

CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE boxes (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    size TEXT NOT NULL,
    price INT NOT NULL,
    status TEXT NOT NULL,
    branchid int NOT NULL REFERENCES branches(id),
    phonenumber TEXT,
    passcode TEXT,
    faceid TEXT,
    transactionid TEXT
);

CREATE TABLE transactions (
    id SERIAL NOT NULL,
    boxid TEXT REFERENCES boxes(id),
    passcode TEXT NOT NULL,
    faceid TEXT,
    checkin timestamp with time zone NOT NULL,
    checkout timestamp with time zone,
    branchid TEXT NOT NULL
);
