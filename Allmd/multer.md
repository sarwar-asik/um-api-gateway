#### upload file with multer :::


### installation ::::

`npm i multer`


### in src>shared>FileUploadHelpers.ts >>>

        
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

    const upload = multer({storage:storage})


```
#### in users>user.routes.ts >>>>>

  ```ts
        router.post('/create-student', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),fileUploadHelper.upload.single('file'),
            (req: Request, res: Response, next: NextFunction) => {
                req.body = UserValidation.createUserZodSchema.parse(JSON.parse(req.body.data));
                return  UserController.createStudent(req,res,next)
            }
        );

```