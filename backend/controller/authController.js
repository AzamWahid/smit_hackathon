import { hash } from 'bcryptjs'
import express from 'express'
import User from '../models/User.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'


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

export const login = () => {
    console.log('login')
}