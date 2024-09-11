import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.post("/register", controllers.auth.registerUser);
router.post("/login", controllers.auth.loginUser);

export default router;
