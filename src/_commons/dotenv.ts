import 'dotenv/config';

export const APP_NAME = process.env.APP_NAME 
export const APP_PORT = process.env.APP_PORT 
export const MODE = process.env.MODE 

export const DATABASE_HOST = process.env.DATABASE_HOST
export const DATABASE_PORT = Number(process.env.DATABASE_PORT)
export const DATABASE_USER = process.env.DATABASE_USER
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const DATABASE_NAME = process.env.DATABASE_NAME 
export const RUN_MIGRATIONS = process.env.RUN_MIGRATIONS

