// Iteration #1
const mongoose = require("mongoose");
require("../configs/db.config.js");

let DroneModel = require("../models/Drone.model.js");


const drones = [
    { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
    { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
    { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

DroneModel.create(drones)
    .then(() => {
        console.log(`Seeding successful. ${drones.length} drones are added.`);

        mongoose.connection.close();
    })
    .catch((error) => {
        console.log("Seeding failed.", error);
    })

