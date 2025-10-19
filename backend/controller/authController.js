import { compare, hash } from 'bcryptjs'
import express from 'express'
import User from '../models/User.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'

import pkg from 'jsonwebtoken';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { connectDB } from '../utils/connectDB.js';


const { sign, verify } = pkg;


export const register = async (req, res) => {
    // console.log(req.body)
    const { userName, email, password, firstName, lastName, age, isAdmin } = req.body

    if (!userName || !email || !password || !firstName || !lastName) {
        // return errorHandler(res, 400, "missing fields");
        return errorHandler(res, 400, "missing fields")
    }

    await connectDB();
    // const isExists = await Users.find({ $or: [{ email: email }, { userName: userName }] })
    const isExists = await User.findOne({ $or: [{ email: email }, { userName: userName }] })

    const hashPassword = await hash(password, 10)
    if (isExists) {
        return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
    }

    if (password.length < 8) {
        return errorHandler(res, 400, "Password length should be minimum 8 characters long")

    }
    let picResponse = {};
    if (!req.file) {
        return errorHandler(res, 400, "Please select pic")

    }
    else {

        picResponse = await uploadOnCloudinary(req.file)
        // return successHandler(res, 200, "Pic Uploaded successfully", picResponse)
    }


    try {
        const newUser = new User({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: hashPassword,
            email: email,
            profilePic: picResponse.secure_url,
            age: age,
            isAdmin: isAdmin,
        })
        await newUser.save();
        return successHandler(res, 200, "User Registered Successfully")

    } catch (error) {
        console.log(err)
        return errorHandler(res, 400, "Something went wrong", error.message)

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            // return errorHandler(res, 400, "missing fields");
            return errorHandler(res, 400, "missing fields")
        }
        await connectDB();

        // const isExists = await Users.find({ $or: [{ email: email }, { userName: userName }] })
        const isExists = await User.findOne({ email: email })


        if (!isExists) {
            return errorHandler(res, 400, "email not exists, please retry")
        }
        const isPasswordCorrect = await compare(
            password, isExists.password
        );
        if (!isPasswordCorrect) {
            return errorHandler(res, 400, "Invalid Creditinals, please retry")
        }




        const token = sign({
            id: isExists._id,
            isAdmin: isExists.isAdmin,
        }, process.env.JWT)
        console.log(token)

        const { password: userPassword, ...otherDetails } = isExists._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        return successHandler(res, 200, "User login Successfully", otherDetails)

    } catch (error) {
        return errorHandler(res, 400, "soemthing went wrong", error.message)

    }
}

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).send({ message: 'Logged out successfully' });
};

export const profilePicUpload = async (req, res) => {
    try {
        if (!req.file) {
            return errorHandler(res, 400, "Please select pic")

        }
        else {

            const picResponse = await uploadOnCloudinary(req.file)
            return successHandler(res, 200, "Pic Uploaded successfully", picResponse)
        }
    }
    catch (err) {
        return errorHandler(res, 400, "Something went wrong")
    }

}
