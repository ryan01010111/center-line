import mongoose from 'mongoose';
import FlightLog from '../models/FlightLog';

function getData(req, res, next) {
    FlightLog.aggregate([
        {
            "$match": {
                "user": mongoose.Types.ObjectId(req.user.id)
            },
        },
        {
            "$sort": { "date": -1 }
        },
        {
            "$set": {
                "ccNight": { "$cond": [{ "$in": ["night", "$ccAdditional"] }, 1, 0] },
                "cc150": { "$cond": [{ "$in": ["150nm", "$ccAdditional"] }, 1, 0] }
            }
        },
        {
            "$group": {
                "_id": null,
                "logs": { "$push": "$$ROOT" },
                "totalHours": { "$sum": "$duration" },
                "dual": { "$sum": "$dual" },
                "pic": { "$sum": "$pic" },
                "night": { "$sum": "$nightTime" },
                "ccDual": { "$sum": "$ccDual" },
                "ccSolo": { "$sum": "$ccSolo" },
                "maneuver": { "$sum": "$maneuver" },
                "takeoffNight": { "$sum": "$takeoffNight" },
                "landNight": { "$sum": "$landNight" },
                "takeoffTower": { "$sum": "$takeoffTower" },
                "landTower": { "$sum": "$landTower" },
                "ccNight": { "$sum": "$ccNight" },
                "cc150": { "$sum": "$cc150" },
                "type": { "$push": "$type" }
            }
        },
        {
            "$project": {
                "_id": 0,
                "logs": 1,
                "totals": {
                    "totalHours": "$totalHours",
                    "dual": "$dual",
                    "pic": "$pic",
                    "night": "$night",
                    "ccDual": "$ccDual",
                    "ccSolo": "$ccSolo",
                    "maneuver": "$maneuver",
                    "takeoffNight": "$takeoffNight",
                    "landNight": "$landNight",
                    "takeoffTower": "$takeoffTower",
                    "landTower": "$landTower",
                    "ccNight": "$ccNight",
                    "cc150": "$cc150",
                    "exam": {
                        "$size": { "$filter": { "input": "$type", "as": "t", "cond": { "$eq": [ "$$t", "exam" ] } } }
                    },
                    "checkride": {
                        "$size": { "$filter": { "input": "$type", "as": "t", "cond": { "$eq": [ "$$t", "checkride" ] } } }
                    },
                    "checkridePrep": {
                        "$size": { "$filter": { "input": "$type", "as": "t", "cond": { "$eq": [ "$$t", "checkridePrep" ] } } }
                    }
                }
            }
        }
    ])
    .then(result => {
        res.locals = {
            ...res.locals,
            totals: result[0].totals,
            logs: result[0].logs
        };
        next();
    })
    .catch(err => res.json(err));
}

export default getData;
