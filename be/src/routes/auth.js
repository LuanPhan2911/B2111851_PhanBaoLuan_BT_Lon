const { Router } = require("express");
const { Authenticate } = require("../middleware/Authenticate");
const AuthController = require("../controllers/AuthController");
const LoginRequest = require("../requests/LoginRequest");
const RegisterRequest = require("../requests/RegisterRequest");
const router = Router();

router.post("/login", LoginRequest, AuthController.login);
router.post("/register", RegisterRequest, AuthController.register);
router.get("/user", Authenticate, AuthController.getUser);
router.get("/logout", Authenticate, AuthController.logout);

module.exports = router;
