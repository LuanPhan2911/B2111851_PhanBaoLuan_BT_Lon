const { Router } = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const LoginRequest = require("../requests/auth/LoginRequest");
const RegisterRequest = require("../requests/auth/RegisterRequest");
const router = Router();

router.post("/login", LoginRequest, AuthController.login);
router.post("/register", RegisterRequest, AuthController.register);
router.get("/user", AuthMiddleware, AuthController.getUser);
router.get("/logout", AuthMiddleware, AuthController.logout);

module.exports = router;
