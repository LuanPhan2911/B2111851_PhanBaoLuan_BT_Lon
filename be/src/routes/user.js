const { Router } = require("express");

const UserController = require("../controllers/UserController");
const UpdateUserRequest = require("../requests/user/UpdateUserRequest");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/fileStorage/upload");
const HasSingleFileMiddleware = require("../middleware/HasSingleFileMiddleware");

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

module.exports = router;
