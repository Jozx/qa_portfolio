import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
    LOGIN_EMAIL: process.env.LOGIN_EMAIL ?? '',
    LOGIN_PASSWORD: process.env.LOGIN_PASSWORD ?? '',
};