const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async (req, res, next) => {

    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach user to job route
        req.user = {userID:payload.userID,name:payload.name}
        next()
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth

