require("dotenv").config();
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const Costumer = require("../../api/models/costumer");
const Spa = require("../../api/models/spa")

const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const lines = data.split('\n');
            const headers = lines[0].split(',');
            const costumers = lines.slice(1).filter(line => line.trim() !== '').map(line => {
                const values = line.split(',');
                return {
                    fullName: values[0],
                    ID: values[1],
                    email: values[2],
                    phone: values[3],
                    spa: values[4],
                    fare: parseFloat(values[5])
                };
            });
            resolve(costumers);
        });
    });
};

mongoose.connect(process.env.DB_URL).then(async () => {
    try {
        await Costumer.collection.drop();
        console.log("Colección de clientes limpia");
    } catch (error) {
        console.log("No se ha podido limpiar la colección de clientes");
    }

    try {
        const csvFilePath = path.join(__dirname, '/BaseDeDatosUsuarios.csv');
        const costumers = await readCSV(csvFilePath);

        const spaMap = await Spa.find().then(spas => spas.reduce((map, spa) => {
            map[spa.name] = spa._id;
            return map;
        }, {}));

        const costumersWithSpaId = costumers.map(costumer => ({
            ...costumer,
            spa: spaMap[costumer.spa]
        }));

        await Costumer.insertMany(costumersWithSpaId);
        console.log("Todos los clientes se han insertado");
    } catch (error) {
        console.log("No se han podido insertar los clientes", error);
    } finally {
        mongoose.disconnect();
    }
});