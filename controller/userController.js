const User = require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const secreteKey = "swekjnknkbkbk78y9y9494y9lnkjf9ry49y0urkn435435433";

// Register

const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) return res.status(400).json({status: false, message: "All files are require"});

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({status: false, message: "Email Allready register"});

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({name, email, password:hashPassword});
        await newUser.save();

        return res.status(201).json({status:true, message: "Register successful"})
    } catch (error) {
        return res.status(400).json({status:false, message: "Something went wrong", error:error.message})
    }
}

//Login

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({status: false, message: "All files are require"});

        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({status: true, message: "Invalid Credeintial"})
        }

        const token = jwt.sign({id:user._id, email: user.email}, secreteKey, { expiresIn: '1hr' });
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 // 1 hr
        })

        return res.status(201).json({status:true, message: "Login successful"});
    } catch (error) {
        return res.status(400).json({status:false, message: "Something went wrong", error:error.message})
    }
}

//Profile

const profile = async(req, res) => {
    try {
        // const token = req.headers?.authorization?.split(' ')[1];

        const token = req?.cookies?.authToken;
        if(!token) return res.status(400).json({status:false, message: "Access Denied"})

        jwt.verify(token, secreteKey, async (err, decode) => {
            const user = await User.findById(decode?.id)
            if(!user) return res.status(400).json({status:false, message: "Invalid Token"})
            const userData = {
                id: user?.id,
                name: user?.name,
                email:user?.email
            }
            return res.status(201).json({status:true, message: "Profile data", data:userData})
        })

        
    } catch (error) {
        return res.status(400).json({status:false, message: "Something went wrong", error:error.message})
    }
}

const logout = (req, res) => {
    res.clearCookie('authToken');
    res.status(201).json({ status: true, message: "logout success" })

}

module.exports = {register, login, profile, logout}