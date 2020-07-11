import { Router } from 'express';
import mongoose from 'mongoose';
import auth from '../../middleware/auth';
import getData from '../../middleware/getData';
import FlightLog from '../../models/FlightLog';

const router = Router();

// @route   GET api/logs/data
// @desc    fetch all logs and aggregated log data
// @access  Private
router.get('/data', auth, getData, (req, res) => {
    res.json(res.locals);
});

// @route   GET api/logs
// @desc    fetch all logs
// @access  Private
router.get('/', auth, (req, res) => {
    FlightLog.find({ "user": mongoose.Types.ObjectId(req.user.id) })
        .sort('-date')
        .then(logs => res.json(logs))
});

// @route   GET api/logs/:id
// @desc    fetch one log
// @access  Private
router.get('/:id', auth, (req, res) => {
    FlightLog.findById(req.params.id)
        .then(log => res.json(log))
        .catch(err => res.json(err));
});

// @route   POST api/logs
// @desc    create log
// @access  Private
router.post('/', auth, (req, res) => {
    const newLog = new FlightLog({ user: mongoose.Types.ObjectId(req.user.id) });
    Object.assign(newLog, req.body.fields);
    newLog.save()
        .then(() => {
            const next = () => res.json(res.locals);
            getData(req, res, next);
        })
        .catch(err => res.json(err));
});

// @route   UPDATE api/logs/:id
// @desc    update log
// @access  Private
router.put('/:id', auth, (req, res) => {
    const fields = req.body.fields;

    FlightLog.findById(req.params.id)
        .then(log => {
            for (let [key, value] of Object.entries(fields)) {
                log[key] = value;
            };
            log.save()
                .then(() => {
                    const next = () => res.json(res.locals);
                    getData(req, res, next);
                });
        })
        .catch(err => res.json(err));
});

// @route   DELETE api/logs/:id
// @desc    delete log
// @access  Private
router.delete('/:id', auth, (req, res) => {
    FlightLog.deleteOne({ _id: req.params.id })
        .then(() => {
            const next = () => res.json(res.locals);
            getData(req, res, next);
        })
        .catch(err => res.json(err));
});

export default router;
