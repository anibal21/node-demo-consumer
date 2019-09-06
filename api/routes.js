import express from "express";

import { postRouter } from "./routes/posts";

const router = express.Router();

router.use("/api/posts", postRouter);

export default router;
