import { Router } from 'express';
import mongoose from 'mongoose';
import auth from '../../middleware/auth';
import User from '../../models/User';

const router = Router();

// @route   GET api/logs
// @desc    fetch all logs
// @access  Private
router.get('/', auth, (req, res) => {
    User.aggregate([
        {
            "$match": { '_id': new mongoose.Types.ObjectId(req.user.id) }
        },
        {
            "$unwind": "$logs"
        },
        {
            "$sort": {
                "logs.date": -1
            }
        },
        {
            "$project": {
                "_id": 0,
                "logs": 1
            }
        }
    ])
    .then(result => {
        let logs = result.map(i => i.logs)
        res.json(logs);
    })
    .catch(err => res.json(err));
});

// @route   GET api/logs/:id
// @desc    fetch one log
// @access  Private
router.get('/:id', auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const log = user.logs.id(req.params.id);
            res.json(log);
        })
        .catch(err => res.json(err));
});

// @route   POST api/logs
// @desc    create log
// @access  Private
router.post('/', auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const newLog = req.body.fields;
            user.logs.push(newLog);
            user.save();
            res.json(user.logs[user.logs.length - 1]);
        })
        .catch(err => res.json(err));
});

// @route   UPDATE api/logs/:id
// @desc    update log
// @access  Private
router.put('/:id', auth, (req, res) => {
    const fields = req.body.fields;

    User.findById(req.user.id)
        .then(user => {
            let log = user.logs.id(req.params.id);
            for (let [key, value] of Object.entries(fields)) {
                log[key] = value;
            };
            user.save();
            res.json(log);
        })
        .catch(err => res.json(err));
});

// @route   DELETE api/logs/:id
// @desc    delete log
// @access  Private
router.delete('/:id', auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.logs.pull(req.params.id);
            user.save();
        })
        .then(() => res.json({ _id: req.params.id }))
        .catch(err => res.json(err));
});

export default router;
