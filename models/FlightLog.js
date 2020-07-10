import mongoose, { Schema } from 'mongoose';

const FlightLogSchema = new Schema({
    user: mongoose.Schema.Types.ObjectId,
    date: Date,
    type: String,
    route: String,
    aircraftModel: String,
    aircraftIdent: String,
    aircraftClass: Array,
    duration: Number,
    nightTime: Number,
    dual: Number,
    pic: Number,
    takeoffDay: Number,
    landDay: Number,
    takeoffNight: Number,
    landNight: Number,
    takeoffTower: Number,
    landTower: Number,
    maneuver: Number,
    ccDual: Number,
    ccSolo: Number,
    ccNight: Number,
    cc150: Number,
    instrumentActual: Number,
    instrumentSim: Number,
    instrumentApproach: Number,
});

const FlightLog = mongoose.model('FlightLog', FlightLogSchema);
export default FlightLog;
