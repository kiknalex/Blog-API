import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.get("/", controllers.user.getAll);
router.get("/:id", controllers.user.getById);

export default router;
