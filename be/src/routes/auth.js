const { Router } = require("express");
const { Authenticate } = require("../middleware/Authenticate");
const AuthController = require("../controllers/AuthController");
const router = Router();

router.post("/api/login", AuthController.login);
router.post("/api/register", AuthController.register);
router.get("/api/user", Authenticate, AuthController.getUser);
router.get("/api/logout", Authenticate, AuthController.logout);

module.exports = router;
