import { Router } from 'express';
import mongoose from 'mongoose';
import auth from '../../middleware/auth';
import Course from '../../models/Course';
import User from '../../models/User';

const router = Router();

// @route   GET api/courses
// @desc    fetch all courses
// @access  Public
router.get('/', (req, res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.json(err));
});

// @route   POST api/courses/assign
// @desc    assign course to user
// @access  Private
router.post('/assign', auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const courseID = req.body._id;
            if (!courseID) {
                user.course = null;
                user.save()
                    .then(user => {
                        const userData = { ...user.toObject() };
                        delete userData.password;
                        res.json(userData);
                    })
                    .catch(err => res.json(err));
            } else {
                user.course = mongoose.Types.ObjectId(courseID);
                user.save()
                    .then(user => {
                        user.execPopulate({ path: 'course', model: 'Course' })
                            .then(user => {
                                const userData = { ...user.toObject() };
                                delete userData.password;
                                res.json(userData);
                            });
                    })
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

export default router;
