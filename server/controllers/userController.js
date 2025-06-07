import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: "Missing Details"
        })
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            cartItems: {}
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.cookie("token", token, {
            httpOnly: true,//prevent javascript to access cookie
            secure: process.env.NODE_ENV === "production", //use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none " : "strict",//CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });


        res.status(201).json({

            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check user
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Logout User
export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

// ✅ Get Current User Profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
