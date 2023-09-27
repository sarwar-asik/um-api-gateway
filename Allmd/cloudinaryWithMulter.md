## Cloudinary for upload file >>>>

##### installation ::::

```bash
npm install cloudinary
```

```bash
npm install multer
```

### create src>helpers>FileUploadHelpers.ts:::

   ```ts
    import {v2 as cloudinary} from 'cloudinary';
    import multer from 'multer';
    import * as fs from "fs"
    import { IUploadFile, IcloudinaryResponse } from '../interfaces/fileUpload';
    import config from '../config';

            cloudinary.config({ 
                cloud_name: 'dwaiudyzc', 
                api_key: '448117487126886', 
                api_secret: config.cloudinary_api_secret
            });```

// !multer

   ```ts
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'uploads/')
        },
        filename:function(req,file,cb){
            cb(null,file.originalname)
            // originalname means file type ///
        }
    })

    const upload = multer({storage:storage})```

// ! cloudinary ///

   ```js
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
}```



#### in users>user.routes.ts >>>>>
```ts


        router.post('/create-student', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),fileUploadHelper.upload.single('file'),
            (req: Request, res: Response, next: NextFunction) => {
                req.body = UserValidation.createUserZodSchema.parse(JSON.parse(req.body.data));
                return  UserController.createStudent(req,res,next)
            }
        );
```

#### in user.service.ts >>>

```ts

    const createStudent = async (req: Request) => {
        console.log(req.file, 'files');
        const file = req.file as IUploadFile;
        const uploadedImage = await fileUploadHelper.uploadToCloudinary(file)

        return uploadedImage
    
    };
```


### type declare src>interface>fileUpload.ts::::

```ts

    export type  IUploadFile ={
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        destination: string,
        filename: string,
        path: string,
        size: number,
    }


    export type IcloudinaryResponse ={
        asset_id: string,
        public_id: string,
        version: number,
        version_id: string,
        signature: string,
        width:  number,
        height: number,
        format: string,
        resource_type: string,
        created_at: string,
        tags: string,
        bytes:  number,
        type: string,
        etag: string,
        placeholder: boolean,
        url: string,
        secure_url: string,
        folder: string,
        overwritten: boolean,
        original_filename: string,
        api_key: string,
    }```