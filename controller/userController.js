const User = require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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

        // session create 
        req.session.user = {
            id: user._id,
            email: user.email,
        };
        return res.status(201).json({status:true, message: "Login successful"});
    } catch (error) {
        return res.status(400).json({status:false, message: "Something went wrong", error:error.message})
    }
}

//Profile

const profile = async (req, res) => {
    
    try {
            if (!req.session.user) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const user = await User.findById(req.session.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Profile data",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};



const logout = (req, res) => {
    req.session.destroy(() => {
    res.clearCookie("Session-cookie");
    res.json({ message: "Logged out" });
    })
}

module.exports = {register, login, profile, logout}