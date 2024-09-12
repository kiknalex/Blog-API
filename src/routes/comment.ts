import controllers from "@/controllers";
import {Router} from "express";

const router = Router({mergeParams: true});

router.get("/", controllers.comment.getAllForPost);
router.post("/", controllers.comment.create);
router.put("/:commentId", controllers.comment.edit);
router.delete("/:commentId", controllers.comment.delete);

export default router;
