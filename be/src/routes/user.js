const { Router } = require("express");

const UserController = require("../controllers/UserController");
const UpdateUserRequest = require("../requests/user/UpdateUserRequest");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/fileStorage/upload");
const HasSingleFileMiddleware = require("../middleware/HasSingleFileMiddleware");
const UserStoreRentingBookRequest = require("../requests/user/UserStoreRentingBookRequest");
const isValidPageNumberMiddleware = require("../middleware/IsValidPageNumberMiddleWare");
const isValidObjectIdMiddleWare = require("../middleware/IsValidObjectIdMiddleware");
const UserDestroyRentingBookRequest = require("../requests/user/UserDestroyRentingBookRequest");

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
router.post(
  "/renting_books/create",
  UserStoreRentingBookRequest,
  UserController.rentBook
);
router.get(
  "/renting_books",
  isValidPageNumberMiddleware,
  UserController.getRentingBooks
);
router.delete(
  "/renting_books/:_id/delete",
  isValidObjectIdMiddleWare,
  UserDestroyRentingBookRequest,
  UserController.destroyRentingBook
);

module.exports = router;
