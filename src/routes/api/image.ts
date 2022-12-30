import express from 'express'
import path from 'path'
import {promises as fs} from 'fs'
import sharp from 'sharp';

interface ImageProp { name?: string; w?: string; h?: string;}

const FullPath: string = path.resolve(__dirname, '../../../images/full');
const OutPath: string = path.resolve(__dirname, '../../../images/out');

const validation = async (prop: ImageProp): Promise<string | null> => {
    if(!prop.name){
        return `Please Enter a valid image name.`;
    }
    // validating whether width holds an appropriate value
    if(Number(prop.w || '') <= 0  || Number.isNaN(prop.w)){
        return 'please Enter any Numerical Value greater than 1 for the width!!.'
    }
    // validating whether height holds an appropriate value
    if(Number(prop.h || '') <= 0  || Number.isNaN(prop.h)){
        return 'please Enter any Numerical Value greater than 1 for the height!!.'
    }

    return null;
   
}
// checking if the processed image is present in the disk
const alreadyOut = async (prop: ImageProp): Promise <boolean> => {
    try {
        await fs.access(OutPath);
      } catch {
        fs.mkdir(OutPath);
      }
    if (prop.name && prop.w && prop.h) {
        const Ipath: string = path.resolve( OutPath, `${prop.name}-${prop.w}x${prop.h}.jpeg`);
        try {
           await fs.access(Ipath); return true;
        }
        catch {
            return false;
        }
      }
    else{
        return false;
      }
}

const imageProcessor = async (prop: ImageProp): Promise <string | null > =>{
  //image processing
    try {
        await fs.access(OutPath);
      } catch {
        fs.mkdir(OutPath);
      }
    try{
        const file = path.resolve(FullPath, `${prop.name}.jpg`)
        const Rfile = path.resolve(OutPath,`${prop.name}-${prop.w}x${prop.h}.jpg`)
        await sharp(file).resize(Number(prop.w), Number(prop.h)).toFormat('jpeg').toFile(Rfile);
        return null;
    }
    catch{
        return 'Image cannot be processed and outputted';
    }
}
const pathFinder = async (prop: ImageProp): Promise <string | null > =>{
    if (prop.name) {
     // Check if a file exists or not
        const Ipath: string =path.resolve( OutPath, `${prop.name}-${prop.w}x${prop.h}.jpg`)
        try {
          await fs.access(Ipath);
          return Ipath;
        } catch {
          return null;
        }
      }
      return null;
  
}
const imageRouter: express.Router = express.Router();

imageRouter.get('/', async (req:express.Request, res:express.Response) => {
    const valid = await validation(req.query)
    if(valid){
        res.send(valid)
        return
    }


    let error: null | string = '';
    if (!(await alreadyOut(req.query))) {
      error = await imageProcessor(req.query);
    }
    if (error) {
      res.send(error);
      return;
    }
    const RIpath: (null | string) = await pathFinder(req.query);
    if (RIpath) {
      res.sendFile(RIpath);

    }

})
export default imageRouter;

