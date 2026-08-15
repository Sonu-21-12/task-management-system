const express = require("express");

const authenticate =
    require("../middleware/authMiddleware");

const validate =
    require("../middleware/validateMiddleware");

const {
    createUserSchema
} = require("../validators/authValidator");

const {
    getUsers,
    getUserById,
    createUser
} = require("../controllers/userController");

const router = express.Router();


// All user APIs require login
router.use(authenticate);


router.get(
    "/",
    getUsers
);


router.get(
    "/:id",
    getUserById
);


router.post(
    "/",
    validate(createUserSchema),
    createUser
);


module.exports = router;