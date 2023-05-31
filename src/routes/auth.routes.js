import { Router } from "express"
import { loginSchema } from "../schemas/auth.schemas.js"
import { userSchema } from "../schemas/user.schema.js"
import { signIn, signUp } from "../controllers/auth.controllers.js"
import { validadeSchema } from "../middlewares/validateSchema.middleware.js"


const authRouter = Router()

authRouter.post("/signup", validadeSchema(userSchema), signUp)
authRouter.post("/signin", validadeSchema(loginSchema), signIn)


export default authRouter