import User from "../models/User.js"
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        successHandler(res, 200, "User get successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getUserByID = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        successHandler(res, 200, "User get successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const getSpecificUser = async (req, res) => {
    const { userName, email, isAdmin } = req.query;
    const filter = {};
    if (userName) filter.userName = userName;
    if (email) filter.email = email;
    if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
    try {
        const userData = await User.find(filter);
        successHandler(res, 200, "User get successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}