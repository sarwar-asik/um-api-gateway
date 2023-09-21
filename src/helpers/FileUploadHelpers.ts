import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dwaiudyzc', 
  api_key: '448117487126886', 
  api_secret: 'G8SWNZe7qnQR0lIyGe_adrFkN9A' 
});

const uploadToCloudinary =async()=>{
    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
}

export const fileUploadHelper ={
    uploadToCloudinary
}