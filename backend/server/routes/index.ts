import { Hono } from "hono";

const indexRouter = new Hono();

indexRouter.get('/', (c)=> c.text('Hello World!'));

export default indexRouter;