const express = require('express');
var fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server error' });
    }

})
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()


        res.json(saveNote);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server error' });
    }
})


module.exports = router;