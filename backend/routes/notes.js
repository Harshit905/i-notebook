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

//update notes
// ROUTE 3: Update an existing Note using: POST "/api/auth/updatenote". Login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//     const {title,description,tag}=req.body;
//     try{
//     //create a new note object
//     const newNote={};N
//     if(title){
//         newNote.title=title;
//     }

//     if(description){
//         newNote.description=description;
//     }

//     if(tag){
//         newNote.tag=tag;
//     }

//     let note=Note.findById(req.params.id);
//     if(!note){res.status(404).send("Not Found")}
//     if(note.user.toString()!==req.user.id){
//         return res.status(401).send("Not Allowed");
//     }
//     note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//     res.json({ note });
// } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
// }


    
//     })


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;