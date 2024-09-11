import controllers from "@/controllers";
import {Router} from "express";

const router = Router();

router.post("/", controllers.post.createPost);

export default router;
