import { Router } from "express"
import { validadeSchema } from "../middlewares/validadeSchema.middleware.js"
import { userSchema } from "../schemas/auth.schemas.js"
import { signup } from "../controllers/auth.controllers.js"


const authRouter = Router()

authRouter.post("/signUp", validadeSchema(userSchema), signup)


export default authRouter