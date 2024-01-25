const { Router } = require("express");
const AuthAdminMiddleware = require("../middleware/AuthAdminMiddleware");
const PublisherController = require("../controllers/PublisherController");
const StorePublisherRequest = require("../requests/publisher/StorePublisherRequest");
const StoreManyPublisherRequest = require("../requests/publisher/StoreManyPublisherRequest");

const router = Router();

router.get("/", PublisherController.index);

router.use(AuthAdminMiddleware);
router.post("/create", StorePublisherRequest, PublisherController.store);
router.post(
  "/create_many",
  StoreManyPublisherRequest,
  PublisherController.storeMany
);
router.delete("/:id/delete", PublisherController.destroy);

module.exports = router;
