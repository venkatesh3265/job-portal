import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError,UnauthenticatedError } from '../errors/index.js'


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('please provide all values')
    }
    const UserAlreadyExit = await User.findOne({ email })
    if (UserAlreadyExit) {
        throw new BadRequestError('Email Already in use')
    }
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { email: user.email, lastName: user.lastName, name: user.name }, token,location: user.location });



}

/**
 * This function handles user login by checking the provided email and password, verifying them, and
 * returning a JSON response with the user's information and a JWT token.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc.
 * @param res - The `res` parameter is the response object that is sent back to the client after the
 * server has processed the request. It contains information such as the status code, headers, and data
 * that will be sent back to the client. In this case, the response object is being used to send a JSON
 */
const login = async (req, res) => {
    const {email,password} = req.body
    if(!email || !password) {
        throw new BadRequestError('Please provide all values');
    }
    const user =await User.findOne({email}).select('+password')
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');

    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Password');
    }
    const token = user.createJWT();
    user.password = undefined;
     res.status( StatusCodes.OK).json({ user, token, location: user.location });

}


const updateUser = async (req, res) => {
    const {email, name , lastName,location} = req.body;
    if(!email || !name || !lastName || !location){

        throw new BadRequestError('please provide all values');
    }
    
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  user.email = email;
  user.name =name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
    
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });

}

export { register, login, updateUser }