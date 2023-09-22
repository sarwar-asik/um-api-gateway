## Cloudinary for upload file >>>>

##### installation ::::

```bash
npm install cloudinary
```

```bash
npm install multer
```

### create src>helpers>FileUploadHelpers.ts:::

    import {v2 as cloudinary} from 'cloudinary';
    import multer from 'multer';
    import * as fs from "fs"


        cloudinary.config({
            cloud_name: 'dwaiudyzc',
            api_key: '448117487126886',
            api_secret: 'G8SWNZe7qnQR0lIyGe_adr'
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

// ! cloudinary ///

    const uploadToCloudinary =async(file:any)=>{

    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(file.path,
        { public_id: file.originalname },
        (error,result)=>{
        fs.unlinkSync(file.path)
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



#### in users>user.routes.ts >>>>>

        router.post('/create-student', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),fileUploadHelper.upload.single('file'),
            (req: Request, res: Response, next: NextFunction) => {
                req.body = UserValidation.createUserZodSchema.parse(JSON.parse(req.body.data));
                return  UserController.createStudent(req,res,next)
            }
        );

#### in user.service.ts >>>


    const createStudent = async (req: Request) => {
        console.log(req.file, 'files');
        const file = req.file;
        const uploadedImage = await fileUploadHelper.uploadToCloudinary(file)

        return uploadedImage
    
    };