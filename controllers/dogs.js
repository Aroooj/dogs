const Dogs = require("../models/Dogs");


exports.list = async (req, res) => {
  try {
    console.log(req.query)
    const message = req.query.message
    const dogs = await Dogs.find({});
    res.render("alldogs", { dogs: dogs, message: message });
    console.log("all dogs")
  } catch (e) {
    res.status(404).send({ message: "could not list dogs" });
  }
};



exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Dogs.findByIdAndRemove(id);
    res.redirect("/alldogs");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
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
          message: `could not find dogs ${id}`
      });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try{
      const dogs = await Dogs.updateOne({ _id: id}, req.body);
      res.redirect('/alldogs');
  } catch (e) {
      res.status(404).send({
          message: `could not find dogs ${id}`
      });
  }
};

exports.create = async (req, res) => {

  try {
    const dogs = new Dogs({ 
        Dog_name: req.body.Dog_name,
        Origin: req.body.Origin,
        Fur: req.body.Fur,
        Height: req.body.Height,
        Color: req.body.Color,
        Longevity: req.body.Longevity,
        Traits: req.body.Traits,
        Health_problems: req.body.Health_problems
      });
    await dogs.save();
    res.redirect('/alldogs')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-dogs', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
};