import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.get("/", controllers.post.getAll);
router.post("/", controllers.post.create);
router.put("/:id", controllers.post.edit);
router.delete("/:id", controllers.post.delete);

export default router;
