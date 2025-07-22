import { compare, hash } from 'bcryptjs'
import express from 'express'
import User from '../models/User.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'

import pkg from 'jsonwebtoken';


const { sign, verify } = pkg;


export const register = async (req, res) => {
    // console.log(req.body)
    const { userName, email, password, firstName, lastName, age, isAdmin } = req.body

    if (!userName || !email || !password || !firstName || !lastName) {
        // return errorHandler(res, 400, "missing fields");
        return errorHandler(res, 400, "missing fields")
    }

    // const isExists = await Users.find({ $or: [{ email: email }, { userName: userName }] })
    const isExists = await User.findOne({ $or: [{ email: email }, { userName: userName }] })

    const hashPassword = await hash(password, 10)
    if (isExists) {
        return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
    }

    if (password.length < 8) {
        return errorHandler(res, 400, "Password length should be minimum 8 characters long")

    }

    try {
        const newUser = new User({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: hashPassword,
            email: email
        })
        await newUser.save();
        return successHandler(res, 200, "User Registered Successfully")

    } catch (error) {
        return errorHandler(res, 400, "Something went wrong", error.message)

    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body

        if (!userName || !password) {
            // return errorHandler(res, 400, "missing fields");
            return errorHandler(res, 400, "missing fields")
        }

        // const isExists = await Users.find({ $or: [{ email: email }, { userName: userName }] })
        const isExists = await User.findOne({ userName: userName })


        if (!isExists) {
            return errorHandler(res, 400, "User Name not exists, please retry")
        }
        const isPasswordCorrect = await compare(
            password, isExists.password
        );
        if (!isPasswordCorrect) {
            return errorHandler(res, 400, "User Name not exists, please retry")
        }




        const token = sign({
            id: isExists._id,
            isAdmin: isExists.isAdmin,
        }, process.env.JWT)
        console.log(token)

        const { userPassword, ...otherDetails } = isExists._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            // secure: true,
            // sameSite: "None"
        });

        return successHandler(res, 200, "User login Successfully")

    } catch (error) {
        return errorHandler(res, 400, "soemthing went wroing", error.message)

    }
}