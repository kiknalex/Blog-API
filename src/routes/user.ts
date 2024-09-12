import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.get("/", controllers.user.getAll);
router.get("/:userId", controllers.user.getById);

export default router;
