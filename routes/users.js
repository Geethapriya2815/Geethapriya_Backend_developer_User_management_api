const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose')
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    });
    try {
        const new_User = await user.save();
        res.status(201).json(new_User)
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age = req.body.age || user.age;
        const updated_user = await user.save();
        res.json(updated_user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const deleted_User = await User.findByIdAndDelete(id);
    if (!deleted_User) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;