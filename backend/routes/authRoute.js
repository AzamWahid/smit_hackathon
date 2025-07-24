import express from 'express';
import { login, profilePicUpload, register } from '../controller/authController.js';
import multer from 'multer';

const authRouter = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({ storage: storage })


authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/profilePic', upload.single('hanzala'), profilePicUpload)



export { authRouter }