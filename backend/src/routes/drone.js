const express = require('express');
const router = express.Router();
const { Drone } = require('../models/drone.js');

// GET all drone records
router.get('/', async (req, res) => {
  try {
    const drones = await Drone.findAll();
    res.json(drones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new drone record
router.post('/', async (req, res) => {
  try {
    const { class: droneClass, confidence } = req.body;
    if (droneClass === undefined || confidence === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const drone = await Drone.create({
      class: droneClass,
      confidence,
      datetime: new Date()
    });

    res.json(drone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
