import express from 'express';
import routes from './routes/index';

const app: express.Application = express();
const port = 3000;
app.use(routes);
// firing up the server
app.listen(port, (): void => {
  console.log(`server is up ...`);
});

export default app;
