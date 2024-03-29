import { Router } from "express";
import { methods as libraryControllers } from "../controllers/library.controller";

const router=Router();

router.get('/', libraryControllers.getLibrary);
router.post('/add', libraryControllers.addLibrary);
router.post('/delete', libraryControllers.deleteLibrary);

export default router;