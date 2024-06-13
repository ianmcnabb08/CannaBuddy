const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

mongoose.connect("mongodb://127.0.0.1:27017/product");

const strainSchema = new mongoose.Schema({
    name: String,
    method: String,
    rating: Number,
    location: String,
    notes: String,
    terpenes: [String],
    effects: [String],
    flavors: [String]
});

const Strain = mongoose.model('Strain', strainSchema);

app.use(cors());
app.use(express.json());

app.post('/strains', async (req, res) => {
    const newStrain = new Strain(req.body);
    try {
        const savedStrain = await newStrain.save();
        res.status(201).json(savedStrain);
    } catch (err) {
        res.status(400).json(err);
            }
    });

    app.get('/strains', async (req, res) => {
        try {
            const strains = await Strain.find();
            res.json(strains);
        } catch (err) {
            res.status(500).json(err);
        }
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));