import express from 'express'
import {imageRouter} from './api/image'

const routes: express.Router = express.Router() 

routes.use('/IApi/image', imageRouter)

routes.get('/', async(req:express.Request, res:express.Response): Promise<void> =>{
    // guiding people to the API
    await res.send(
        '<h1>image processing api intiated</h1>'+
        '<p>Listening on <a href="IApi/image">IApi/image</a>'
      );
})

export default routes