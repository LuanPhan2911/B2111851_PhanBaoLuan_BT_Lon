const { Router } = require("express");
const AuthAdminMiddleware = require("../middleware/AuthAdminMiddleware");
const StoreGenreRequest = require("../requests/genre/StoreGenreRequest");
const GenreController = require("../controllers/GenreController");
const StoreManyGenreRequest = require("../requests/genre/StoreManyGenreRequest");

const router = Router();

router.get("/", GenreController.index);

router.use(AuthAdminMiddleware);
router.post("/create", StoreGenreRequest, GenreController.store);
router.post("/create_many", StoreManyGenreRequest, GenreController.storeMany);
router.delete("/:id/delete", GenreController.destroy);

module.exports = router;
