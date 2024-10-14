import { addCity } from "../../controllers/admin/addcity.js";
import express from "express";
import { AuthMiddleware } from "../../middlewares/auth.js";
import { AdminMiddleware } from "../../middlewares/actors/auth.admin.js";
var router = express.Router();
router.post("/addcity", AuthMiddleware.verifyToken, AdminMiddleware.isAdmin, addCity);
export default router;
