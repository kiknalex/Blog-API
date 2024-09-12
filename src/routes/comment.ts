import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.get("/", controllers.comment.getAll);
router.post("/", controllers.comment.create);
router.put("/:id", controllers.comment.edit);
router.delete("/:id", controllers.comment.delete);

export default router;
