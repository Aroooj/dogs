const Dogs = require('../models/Dogs');

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const allDogs = await Dogs.find({}).count();
        const allFurs = await Dogs.aggregate([
            { $group: { _id: "$Fur", total: { $sum: 1}}},
            { $count: "total"}
        ])

        const allOrigins = await Dogs.aggregate([
            { $group: { _id:"$Origin", total: { $sum: 1}}},
            { $count: "total"}
        ])

        console.log(allDogs)
        
        res.render("index", {allDogs: allDogs, allFurs: allFurs[0].total, allOrigins: allOrigins[0].total});
    }catch (e) {
        console.log(e)
        res.status(404).send({
            message: 'error rendering page',
        });
    }
}