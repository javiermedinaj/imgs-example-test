import { cors } from 'hono/cors';
import type { MiddlewareHandler } from 'hono';

export const corsMiddleware: MiddlewareHandler = cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
});