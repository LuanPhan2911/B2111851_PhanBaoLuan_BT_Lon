const { Router } = require("express");

const UserController = require("../controllers/UserController");
const UpdateUserRequest = require("../requests/user/UpdateUserRequest");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/fileStorage/upload");
const HasSingleFileMiddleware = require("../middleware/HasSingleFileMiddleware");
const StoreRentingBookRequest = require("../requests/user/StoreRentingBookRequest");

const router = Router();
router.use(AuthMiddleware);
router.get("/edit", UserController.edit);
router.put("/edit", UpdateUserRequest, UserController.update);
router.put(
  "/edit/avatar",
  upload({ dir: "users" }).single("avatar"),
  HasSingleFileMiddleware,
  UserController.updateAvatar
);
router.post("/rent_book", StoreRentingBookRequest, UserController.rentBook);

module.exports = router;
