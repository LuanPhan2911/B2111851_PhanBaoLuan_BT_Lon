const { Router } = require("express");
const AuthAdminMiddleware = require("../middleware/AuthAdminMiddleware");
const StoreBookRequest = require("../requests/book/StoreBookRequest");
const BookController = require("../controllers/BookController");
const router = Router();

router.use(AuthAdminMiddleware);
router.post("/create", StoreBookRequest, BookController.store);
module.exports = router;
