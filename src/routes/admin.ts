import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.delete("/posts/:postId", controllers.post.admin.delete);
router.delete("/comments/:commentId", controllers.comment.admin.delete);
router.put("/users/:userId/role", controllers.user.admin.grandAdminRole);

export default router;
