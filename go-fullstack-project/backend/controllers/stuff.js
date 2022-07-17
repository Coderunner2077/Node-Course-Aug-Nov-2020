const Thing = require('../models/Thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    let objectThing = JSON.parse(req.body.thing);
    delete objectThing._id;
    let thing = new Thing({
      ...objectThing,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({message: "Objet enregistré !"}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    let objectThing, newImage = false;
    if(req.file) {
      objectThing = JSON.parse(req.body.thing);      
      objectThing.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      newImage = true;
    } else objectThing = req.body;
    
    Thing.findOneAndUpdate({ _id: req.params.id}, { ...objectThing, _id: req.params.id})
      .then(thing => {
        if(newImage) {
          let filename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => { 
            console.log('deleted old one');
          });
        }
        res.status(201).json({ message: "Objet modifié !"})
      })
      .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.findOneAndDelete({ _id: req.params.id})
    .then(thing => {
      let filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
        console.log('deleted');
      })
      res.status(200).json({ message: 'Objet supprimé !'});
      
    })
    .catch(error => res.status(400).json({ error }));
    /* // it gave error 500 for some reason and had to do fineOneAndDelete
    Thing.findOne({ _id: req.params.id})
      .then(thing => {
        let filenme = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
         
        });
      })
      .catch(error => res.status(500).json({ error: 'erreur 500 dans deleteThing' }));*/
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};