import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000; 
app.use(routes);
// firing up the server
app.listen(port, ()=> {
  console.log(`server is up ...`);
});

export default app;