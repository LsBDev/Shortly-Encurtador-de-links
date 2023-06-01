import { Router } from "express"
import { deleteLink, getLink, openLink, shortenLink } from "../controllers/link.controllers.js"
import { linkSchema } from "../schemas/link.schema.js"
import { validadeSchema } from "../middlewares/validateSchema.middleware.js"
import { validateAuth } from "../middlewares/validateAuth.middleware.js"

const linkRouter = Router()

linkRouter.post("/urls/shorten", validadeSchema(linkSchema), validateAuth, shortenLink)
linkRouter.get("/urls/:id", getLink)
linkRouter.get("/urls/open/:shortUrl", openLink)
linkRouter.delete("/urls/:id", validateAuth, deleteLink)


export default linkRouter