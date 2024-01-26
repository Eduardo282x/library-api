import { Router } from "express";
import { methods as bookstestControllers } from "../controllers/books.controller";

const router=Router();

router.get('/', bookstestControllers.getBooks);
router.get('/book', bookstestControllers.getBooks);
router.get('/thesis', bookstestControllers.getThesis);
router.post('/add', bookstestControllers.addBooksThesis);
router.post('/update', bookstestControllers.editBooksThesis);
router.post('/delete', bookstestControllers.deleteBooksThesis);

export default router;