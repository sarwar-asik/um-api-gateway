import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
          
cloudinary.config({ 
  cloud_name: 'dwaiudyzc', 
  api_key: '448117487126886', 
  api_secret: 'G8SWNZe7qnQR0lIyGe_adrFkN9A' 
});

// !multer 

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




const uploadToCloudinary =async()=>{
    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
}

export const fileUploadHelper ={
    uploadToCloudinary,
    upload
}