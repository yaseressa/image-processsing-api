import express from 'express'
import imageRouter from './api/image'

const routes: express.Router = express.Router() 

routes.use('/IApi/image', imageRouter)

routes.get('/', (req, res) =>{
    // guiding people to the API
    res.send(
        '<h1>image processing api intiated</h1>'+
        '<p>Listening on <a href="IApi/image">IApi/image</a>'
      );
})

export default routes