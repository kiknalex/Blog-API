import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.get("/", controllers.post.getAll);
router.post("/", controllers.post.create);
router.put("/:postId", controllers.post.edit);
router.delete("/:postId", controllers.post.delete);
router.put("/:postId/status", controllers.post.editPublicity);
export default router;
