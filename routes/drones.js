const express = require('express');

// require the Drone model here

const router = express.Router();

const DroneModel = require("../models/Drone.model.js");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
    .then((drones) => {
      res.render("drones/list.hbs", { drones });
    })
    .catch((err) => {
      console.log("Finding failed", err);
    });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;

  let newDrone = {
    name,
    propellers,
    maxSpeed
  }

  DroneModel.create(newDrone)
    .then(() => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Adding is failed", err);
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone

  let id = req.params.id;

  DroneModel.findById(id)
    .then((drone) => {
      res.render("drones/update-form", { drone });
    })
    .catch((err) => {
      console.log("finding by id failed", err);
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id;

  const { name, propellers, maxSpeed } = req.body;

  let editedDrone = {
    name,
    propellers,
    maxSpeed
  }

  DroneModel.findByIdAndUpdate(id, editedDrone)
    .then(() => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log(err);

      // we are not sure about this, please give feedback
      // res.render("drones/update-form", { editedDrone });
      res.redirect(`/drones/${id}/edit`);
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let id = req.params.id;

  DroneModel.findByIdAndDelete(id)
    .then(() => {
      console.log("Deletion successful");
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Deletion failed", err);
    });
});

module.exports = router;
