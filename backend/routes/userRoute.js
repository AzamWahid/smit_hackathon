import express from 'express';
import { getAllUsers, getSpecificUser, getUserByID } from '../controller/userController.js';

const userRouter = express.Router();


userRouter.get('/getAllUsers', getAllUsers)
userRouter.get('/getUserByID/:id', getUserByID)
// userRouter.post('/login', login)
// userRouter.post('/profilePic', upload.single('ProfPic'), profilePicUpload)



export { userRouter }