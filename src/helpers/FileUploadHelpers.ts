import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import * as fs from "fs"
import { IUploadFile, IcloudinaryResponse } from '../interfaces/fileUpload';


cloudinary.config({ 
  cloud_name: 'dwaiudyzc', 
  api_key: '448117487126886', 
  api_secret: 'G8SWNZe7qnQR0lIyGe_adrFkN9A' 
});

// !multer (for upload file in folder )

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname) 
    // originalname means file type ///
  }
})

const upload = multer({storage:storage})


// ! cloudinary ///

const uploadToCloudinary =async(file:IUploadFile):Promise<IcloudinaryResponse>=>{
  //   cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  // { public_id: "olympic_flag" }, 
  // function(error, result) {console.log(result); });

  return new Promise((resolve,reject)=>{
    cloudinary.uploader.upload(file.path,
    // { public_id: file.originalname },  //! don't need the line otherwise will type error
    
    (error:Error,result:IcloudinaryResponse)=>{
      fs.unlinkSync(file.path)   ///! unlinkSync means delete file
      if(error){
        reject(error)
      }else{
        resolve(result)
      }
    }
    
    );
  })
}

export const fileUploadHelper ={
    uploadToCloudinary,
    upload
}