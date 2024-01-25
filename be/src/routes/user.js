const { Router } = require("express");

const UserController = require("../controllers/UserController");
const UpdateUserRequest = require("../requests/user/UpdateUserRequest");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = Router();
router.use(AuthMiddleware);
router.get("/edit", UserController.edit);
router.put("/edit", UpdateUserRequest, UserController.update);

module.exports = router;
