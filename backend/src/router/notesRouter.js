import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNotesBy} from "../controllers/notesController.js";

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNotesBy);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;