import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/userModel.js'


//register
const register = async (req,res) => {
    const {userName, email, password} = req.body;

    try {

        const existUser = await User.findOne({email})
        if (existUser) {
            return res.json({
                success : false,
                message : 'User already exist with provided email Id'
            })
        }

        const hashPassword = await bcrypt.hash(password,12)

        const newNser = new User({
            userName,
            email,
            password : hashPassword
        })
        await newNser.save()
        res.status(201).json({
            success:true,
            message:'Registration successful'
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

//login
const login = async (req,res) => {
    const {email, password} = req.body;

    const cookieOption = {
        maxAge: 60*60*1000,
        httpOnly:true,
        secure: true
    }

    try {
        const existUser = await User.findOne({email})

        if (!existUser) {
            return res.json({
                success : false,
                message : 'User dose not exist'
            })
        }

        const comparePassword = await bcrypt.compare(password,existUser.password)
        if (!comparePassword) {
            return res.json({
                success : false,
                message : 'Incorrect password'
            })
        }

        const token = jwt.sign({
            id : existUser._id, role : existUser.role, email : existUser.email,userName : existUser.userName
        },process.env.JWT_SECRET,{expiresIn : '60m'})

        res.cookie('token',token,cookieOption)
        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            user : {
                email : existUser.email,
                role : existUser.role,
                id : existUser._id,
                userName : existUser.userName
            }
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

const logout = (req,res)=>{
    res.clearCookie('token').json({
        success : true,
        message : 'Logged out successfully'
    })
}

const authMiddlewear = async(req,res,next)=>{
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({
            success : false,
            message : 'Please login again'
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if (!decode) {
            return res.status(401).json({
                success : false,
                message : 'Unautherised user!'
            })
        }
        req.user = decode
        next()
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

export {
    register,
    login,
    logout,
    authMiddlewear
}