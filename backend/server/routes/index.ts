import { Hono } from "hono";

const indexRouter = new Hono();

indexRouter.get('/', (c)=> c.text('Product API'));

export default indexRouter;