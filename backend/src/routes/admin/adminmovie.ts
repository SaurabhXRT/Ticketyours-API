import express from "express";
const router = express.Router();
import {
    addMovietodbcontroller,
    addCasttothedb,
    addCrewstothedb,
    searchCast,
    searchCrew,
    addcastToTheMovie,
    addCrewToTheMovie,
    addlanguagesToTheMovie
} from "../../controllers/admin/admin.movie.js";
import { AuthMiddleware } from "../../middlewares/auth.js";
import { AdminMiddleware } from "../../middlewares/actors/auth.admin.js";

router.post("/addmovietothedatabase", AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, addMovietodbcontroller);
router.post("/addcaststothedatabase", AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, addCasttothedb);
router.post("/addcrewstothedatabase",  AuthMiddleware.verifyToken,AdminMiddleware.isAdmin,addCrewstothedb);
router.get("/searchcasts", AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, searchCast);
router.get("/searchcrews", AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, searchCrew);
router.post("/addcaststothemovie", AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, addcastToTheMovie);
router.post("/addcrewstothemovie",  AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, addCrewToTheMovie);
router.post("/addlanguagestothemovie", AuthMiddleware.verifyToken,AdminMiddleware.isAdmin, addlanguagesToTheMovie);

export default router;