const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ 
            token, 
            user: { 
                id: user._id, 
                name, 
                email 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error signing in' });
    }
};

const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
};

module.exports = {
    signup,
    signin,
    getProfile
};
