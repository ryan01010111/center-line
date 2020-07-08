import { Router } from 'express';
import mongoose from 'mongoose';
import auth from '../../middleware/auth';
import User from '../../models/User';
import FlightLog from '../../models/FlightLog';
import Course from '../../models/Course';

const router = Router();

// @route   GET api/logs
// @desc    fetch all logs
// @access  Private
router.get('/', auth, (req, res) => {
    // Promise.all([
    //     User.findById(req.user.id)
    //         .populate('course'),
    //     FlightLog.aggregate([
    //         {
    //             "$match": {
    //                 "user": mongoose.Types.ObjectId(req.user.id)
    //             },
    //         },
    //         {
    //             "$unwind": {
    //                 "path": "$ccAdditional",
    //                 "preserveNullAndEmptyArrays": true
    //             }
    //         },
    //         {
    //             "$group": {
    //                 "_id": null,
    //                 "totalHours": { "$sum": "$duration" },
    //                 "dual": { "$sum": "$duration" },
    //                 "pic": { "$sum": "$pic" },
    //                 "night": { "$sum": "$nightTime" },
    //                 "ccDual": { "$sum": "$ccDual" },
    //                 "ccSolo": { "$sum": "$ccSolo" },
    //                 "maneuver": { "$sum": "$maneuver" },
    //                 "takeoffNight": { "$sum": "$takeoffNight" },
    //                 "landNight": { "$sum": "$landNight" },
    //                 "takeoffTower": { "$sum": "$takeoffTower" },
    //                 "landTower": { "$sum": "$landTower" },
    //                 "cca": { "$push": "$ccAdditional" },
    //                 "type": { "$push": "$type" }
    //             }
    //         },
    //         {
    //             "$project": {
    //                 "_id": 0,
    //                 "totalHours": 1,
    //                 "dual": 1,
    //                 "pic": 1,
    //                 "night": 1,
    //                 "ccDual": 1,
    //                 "ccSolo": 1,
    //                 "maneuver": 1,
    //                 "takeoffNight": 1,
    //                 "landNight": 1,
    //                 "takeoffTower": 1,
    //                 "landTower": 1,
    //                 "ccNight": {
    //                     "$size": { "$filter": { "input": "$cca", "as": "c", "cond": { "$eq": [ "$$c", "night" ] } } }
    //                 },
    //                 "cc150": {
    //                     "$size": { "$filter": { "input": "$cca", "as": "c", "cond": { "$eq": [ "$$c", "150nm" ] } } }
    //                 },
    //                 "exam": {
    //                     "$size": { "$filter": { "input": "$type", "as": "t", "cond": { "$eq": [ "$$t", "exam" ] } } }
    //                 },
    //                 "checkride": {
    //                     "$size": { "$filter": { "input": "$type", "as": "t", "cond": { "$eq": [ "$$t", "checkride" ] } } }
    //                 },
    //                 "checkridePrep": {
    //                     "$size": { "$filter": { "input": "$type", "as": "t", "cond": { "$eq": [ "$$t", "checkridePrep" ] } } }
    //                 },
    //             }
    //         }
    //     ])
    // ])
    // .then(result => {
    //     res.json({
    //         course: result[0].course,
    //         totals: result[1][0]
    //     });
    // })
    // .catch(err => res.json(err));
    FlightLog.find({ "user": mongoose.Types.ObjectId(req.user.id) })
        .sort('-date')
        .then(logs => res.json(logs))
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
