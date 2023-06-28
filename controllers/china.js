const Dogs = require("../models/Dogs");

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const dogs = await Dogs.find({Origin: "China"});
        res.render("China", { dogs: dogs, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list dogs"});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Dogs.findByIdAndRemove(id);
        res.redirect("/china");
    } catch (e) {
        res.status(404).send({
            message: `could not delete dog ${id}.`
        });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try{
        const dogs = await Dogs.findById(id);
        res.render('update-dogs', { dogs: dogs, id: id});
    } catch (e) {
        res.status(404).send({
            message: `could not find dog ${id}`
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try{
        const dogs = await Dogs.updateOne({ _id: id}, req.body);
        res.redirect('/china');
    } catch (e) {
        res.status(404).send({
            message: `could not find dog ${id}`
        });
    }
};