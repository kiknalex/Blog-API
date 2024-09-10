import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.get("/", controllers.user.getAllUsers);

export default router;
