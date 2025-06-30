import app from './server/server'

const port = 3000;

export default {
    port,
    fetch: app.fetch,
}