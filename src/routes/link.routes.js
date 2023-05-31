import { Router } from "express"
import { deleteLink, getLink, openLink, shortenLink } from "../controllers/link.controllers.js"
import { validadeSchema } from "../middlewares/validadeSchema.middleware.js"
import { linkSchema } from "../schemas/link.schema.js"

const linkRouter = Router()

linkRouter.post("/urls/shorten", validadeSchema(linkSchema), shortenLink)
linkRouter.get("/urls/:id", getLink)
linkRouter.get("/urls/open/:shortUrl", openLink)
linkRouter.delete("/urls/:id", deleteLink)


export default linkRouter