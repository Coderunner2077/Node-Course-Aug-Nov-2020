const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/crud', 
    { useNewUrlParser: true,
      useUnifiedTopology: true})
    .then(() => console.log("Connexion réussie à la basse de données"))
    .catch(() => console.error("Connexion à la base de données a échoué"));

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
        'Origin, Content, X-Requested-With, Content-type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json({ products}))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({ product }))
        .catch(error => res.status(404).json({ error }))
});

app.post('/api/products', (req, res, next) => {
    let product = new Product({ ...req.body })
    product.save()
        .then(product => res.status(201).json({ product }))
        .catch(error => res.status(400).json({ error }))
});

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!'}))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Deleted!' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;





    
    