const { Router } = require("express");
const AuthAdminMiddleware = require("../middleware/AuthAdminMiddleware");
const RentingBookController = require("../controllers/RentingBookController");
const isValidObjectIdMiddleWare = require("../middleware/IsValidObjectIdMiddleware");
const UpdateStatusRentingBookRequest = require("../requests/rentingBook/UpdateStatusRentingBookRequest");
const isValidPageNumberMiddleware = require("../middleware/IsValidPageNumberMiddleWare");
const AdminStoreRentingBookRequest = require("../requests/rentingBook/AdminStoreRentingBookRequest");
const UserController = require("../controllers/UserController");

const router = Router();
router.use(AuthAdminMiddleware);
router.get(
  "/books/renting",
  isValidPageNumberMiddleware,
  RentingBookController.index
);
router.get(
  "/books/:_id/renting",
  isValidObjectIdMiddleWare,
  RentingBookController.show
);
router.put(
  "/renting_books/:_id/edit",
  isValidObjectIdMiddleWare,
  UpdateStatusRentingBookRequest,
  RentingBookController.update
);
router.post(
  "/renting_books/create",
  AdminStoreRentingBookRequest,
  RentingBookController.store
);
router.delete(
  "/renting_books/:_id/delete",
  isValidObjectIdMiddleWare,
  RentingBookController.destroy
);

module.exports = router;
