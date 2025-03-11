import {cors} from 'hono/cors';
import type { MiddlewareHandler } from 'hono';

export const corsMiddleware: MiddlewareHandler = cors({
    origin: "*", //de momento le pogngo allow a todo luego lo cambio al puerto de vite
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
})