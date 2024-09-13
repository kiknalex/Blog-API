import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.delete("/posts/:postId", controllers.admin.deletePost);
router.delete("/comments/:commentId", controllers.admin.deleteComment);

export default router;
