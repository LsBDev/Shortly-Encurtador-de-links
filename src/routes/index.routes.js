import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import linkRouter from "./link.routes.js";

const router = Router()
router.use(authRouter)
router.use(userRouter)
router.use(linkRouter)

export default router