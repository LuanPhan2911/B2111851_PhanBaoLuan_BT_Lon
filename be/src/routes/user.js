const { Router } = require("express");

const UserController = require("../controllers/UserController");
const UpdateUserRequest = require("../requests/user/UpdateUserRequest");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/fileStorage/upload");

const router = Router();
router.use(AuthMiddleware);
router.get("/edit", UserController.edit);
router.put(
  "/edit",
  [
    upload({
      dir: "users",
    }).single("avatar"),
    UpdateUserRequest,
  ],
  UserController.update
);

module.exports = router;
