require("dotenv").config();
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const Spa = require("../../api/models/spa");

const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const lines = data.split('\n');
            const headers = lines[0].split(',');
            const spas = lines.slice(1).filter(line => line.trim() !== '').map(line => {
                const values = line.split(',');
                let spa = {};
                headers.forEach((header, index) => {
                    let value = values[index].trim();
                    if (header.trim() === 'services') {
                        try {
                            spa[header.trim()] = JSON.parse(value.replace(/'/g, '"'));
                        } catch (error) {
                            console.log(`Error parsing JSON for services: ${value}`);
                        }
                    } else if (header.trim() === 'phone number') {
                        spa['phoneNumber'] = Number(value);
                    } else if (header.trim() === 'address') {
                        spa['address'] = value;
                    } else {
                        spa[header.trim()] = value;
                    }
                });
                return spa;
            });
            resolve(spas);
        });
    });
};

mongoose.connect(process.env.DB_URL).then(async () => {
    try {
        await Spa.collection.drop();
        console.log("Colección limpia");
    } catch (error) {
        console.log("No se ha podido limpiar la colección de spas");
    }

    try {
        const csvFilePath = path.join(__dirname, '/SpasComas.csv');
        const spas = await readCSV(csvFilePath);
        await Spa.insertMany(spas);
        console.log("Todos los productos se han insertado");
    } catch (error) {
        console.log("No se han podido insertar los spas", error);
    }
}).finally(() => mongoose.disconnect());