import { Router } from 'express';
import FlightLog from '../../models/FlightLog';

const router = Router();


// @route   GET api/logs
// @desc    fetch all logs
// @access  Public
router.get('/', (req, res) => {
    FlightLog.find()
        .then(log => res.json(log))
        .catch(err => res.json(err));
});

// @route   GET api/logs/:id
// @desc    fetch one log
// @access  Public
router.get('/:id', (req, res) => {
    FlightLog.findById(req.params.id)
        .then(log => res.json(log))
        .catch(err => res.json(err));
});

// @route   POST api/logs
// @desc    create log
// @access  Public
router.post('/', (req, res) => {
    const newLog = new FlightLog();
    Object.assign(newLog, req.body.fields);
    newLog.save()
        .then(log => res.json(log))
        .catch(err => res.json(err));
});

// @route   UPDATE api/logs/:id
// @desc    update log
// @access  Public
router.put('/:id', (req, res) => {
    const fields = req.body.fields;

    FlightLog.findById(req.params.id)
        .then(log => {
            for (let [key, value] of Object.entries(fields)) {
                log[key] = value;
            };
            log.save();
            res.json(log);
        })
        .catch(err => res.json(err));
});

// @route   DELETE api/logs/:id
// @desc    delete log
// @access  Public
router.delete('/:id', (req, res) => {
    FlightLog.findById(req.params.id)
        .then(log => log.remove())
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
});

export default router;
