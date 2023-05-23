import { Router } from "express"
import { validadeSchema } from "../middlewares/validadeSchema.middleware.js"
import { loginSchema, userSchema } from "../schemas/auth.schemas.js"
import { signIn, signUp } from "../controllers/auth.controllers.js"


const authRouter = Router()

authRouter.post("/signUp", validadeSchema(userSchema), signUp)
authRouter.post("/signIn", validadeSchema(loginSchema), signIn)


export default authRouter