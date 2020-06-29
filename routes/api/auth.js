import { Router } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';
import User from '../../models/User';

const router = Router();
dotenv.config();

// @route   POST api/auth/login
// @desc    authenticate user
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'all fields required'});
    }

    User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(400).json({error: 'invalid credentials'});
        }

        bcrypt.compare(password, user.password)
        .then(matched => {
            if (!matched) {
                return res.status(400).json({error: 'invalid credentials'});
            }

            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 86400 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }
                    });
                }
            )
        })
    }).catch(err => res.json(err));
});

// @route   POST api/auth/register
// @desc    register new user
// @access  Public
router.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({error: 'all fields are required'});
    }

    User.findOne({ email })
    .then(user => {
        if (user) {
            return res.status(400).json({error: 'email address is already registered'});
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;

                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hash
                });
                newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 86400 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                }
                            });
                        }
                    )
                });
            });
        });
    })
    .catch(err => res.json(err));
});

// @route   GET api/auth/user
// @desc    validate user
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

export default router;
