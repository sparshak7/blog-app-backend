import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUpdateUser } from "../validators/validator";

const router = express.Router()

router.post("/", jwtCheck, userController.createUser)
router.put("/", jwtCheck, jwtParse, validateUpdateUser, userController.updateUser)
router.get("/", jwtCheck, jwtParse, userController.getUser)

export default router;